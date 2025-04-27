import { create } from "zustand";
import { useEffect } from "react";

import { getServerPaths } from "../utils/constants/paths";

const SERVER_PATHS = getServerPaths();

/**
 * Zustando store for managing book-related data and operations.
 *
 * This store handles fetching, adding, deleting, updating, searching
 * and filtering books. It also manages the fetch status and potential
 * server error during API requests.
 *
 * ## State:
 * - `books`: List of registered books.
 * - `fetchStatus`: Represents the request state ("idle" | "loading" | "success" | "error").
 * - `error`: Store any error messages from API requests.
 *
 * ## Methods:
 * - `fetchBooks()`: fetches all books from the server.
 * - `addBook(newBook)`: Adds a new book to the store and server.
 * - `removeBook(bookId)`: Removes a book form the store and server.
 * - `updateBook(book)`: Updates a book in the store and server.
 * - `searchBooks(queryType, text)`: Searchs books for author or title.
 * - `filterBooks(filters)`: Filters books based on ownership and status.
 *
 */
const useBookStore = create((set, get) => ({
    books: [],
    fetchStatus: "idle", // "idle" | "loading" | "success" | "error"
    error: null,

    /**
     * @typedef {import("../utils/propTypes/propTypes").bookShapeType} bookShapeType
     */

    /**
     * Makes the fetch for all registered books and update the store state.
     *
     * @throws {Error} - Throws an erro if the HTTP request fails.
     */
    fetchBooks: async () => {
        set({ fetchStatus: "loading", error: null });
        try {
            const response = await fetch(SERVER_PATHS.books, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(
                    `Request Error: ${response.status} ${response.statusText}`
                );
            }

            const registeredBooks = await response.json();
            set({ books: registeredBooks, fetchStatus: "success" });
        } catch (error) {
            set({ books: [], error: error.message, fetchStatus: "error" });
            console.error(`Error fetching books: ${error}`);
        }
    },

    /**
     * Adds a book to the local store and to the backend server
     *
     * @async
     * @param {bookShapeType} newBook - The book to the added to the database.
     *
     * @throws {Error} - Throws an error if the HTTP request fails.
     */
    addBook: async (newBook) => {
        set({ fetchStatus: "loading", error: null });

        try {
            const response = await fetch(SERVER_PATHS.books, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error(
                    `Request error: ${response.status} ${response.statusText}`
                );
            }

            const savedBook = await response.json();
            set((state) => ({
                books: [...state.books, savedBook],
                fetchStatus: "success",
            }));
        } catch (error) {
            set({ error: error.message, fetchStatus: "error" });
            console.error(`Error adding book: ${error}`);
        }
    },

    /**
     * Removes a book from the local store and from the backend server.
     *
     * @async
     * @param {string} bookId - The book's ID.
     *
     * @throws {Error} throws an error if the HTTP request fails.
     */
    removeBook: async (bookId) => {
        set({ fetchStatus: "loading", error: null });

        try {
            const response = await fetch(`${SERVER_PATHS.books}/${bookId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(
                    `Request error: ${response.status} ${response.statusText}`
                );
            }

            set((state) => ({
                books: state.books.filter((book) => book.id !== bookId),
                fetchStatus: "success",
            }));
        } catch (error) {
            set({ error: error.message, fetchStatus: "error" });
            console.error(`Error removing book: ${error}`);
        }
    },

    /**
     * Updates a book from the local store and from the backend server.
     *
     * @async
     * @param {bookShapeType} book - The updated book.
     *
     * @throws {Error} - Throws an error if the HTTP request fails.
     */
    updateBook: async (book) => {
        set({ fetchStatus: "loading", error: null });

        try {
            const response = await fetch(`${SERVER_PATHS.books}/${book.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error(
                    `Request error: ${response.status} ${response.statusText}`
                );
            }

            const updatedBook = await response.json();
            set((state) => ({
                books: state.books.map((book) =>
                    book.id === updatedBook.id ? updatedBook : book
                ),
                fetchStatus: "success",
            }));
        } catch (error) {
            set({ error: error.message, fetchStatus: "error" });
            console.error(`Error updating book: ${error}`);
        }
    },

    /**
     * Searchs all books with the corresponding book's title or author's name.
     *
     * @async
     * @param {string} queryType - The field to be searched. The possible values are
     * listed bellow:
     * - **author**.
     * - **title**.
     * @param {string} text - The text to be search across the database.
     *
     * @returns {Array<bookShapeType>} Returns an array with the books.
     *
     * @throws {Error} Throws an error if the query type provided is invalid.
     */
    searchBooks: (queryType, text) => {
        set({ error: null });

        try {
            const validQueryTypes = ["author", "title"];

            if (!validQueryTypes.includes(queryType)) {
                throw new Error(
                    `Invalid 'queryType' provided (${queryType}). The 'queryType' must be either 'author' or 'title'.`
                );
            }

            const queryResult = get().books.filter((book) =>
                book[queryType].toLowerCase().startsWith(text.toLowerCase())
            );

            return queryResult;
        } catch (error) {
            set({ error: error.message });
            console.error(`Error searching books: ${error}`);
        }
    },

    /**
     * Filters the books based on the provided filters.
     *
     * This function accepts an object with key-value pairs to return
     * the books that matches the specified conditions.
     *
     * @param {Object} [filters] - An object containing filters criteria for the books.
     * @param {boolean} [filters.ownership] - The ownership status for the books. The values
     * are listed bellow:
     * - **sim**: The user own the book.
     * - **não**: The user does not own the book.
     * @param {string} [filters.status] - The status of the book. The values are listed bellow:
     * - **"read"**.
     * - **"notRead"**.
     * - **"abandoned"**.
     * - **"reading"**.
     *
     * @example
     * const criterias = {status: "read", ownership: "sim"};
     * const filteredBooks = filterBooks(criterias);
     * console.log(filteredBooks);
     *
     * @returns {Array<bookShapeType>} Returns an array with the books. If no filters are passed, all books
     * are returned.
     *
     * @throws {Error} Throws an error if the filter criteria isn't valid.
     */
    filterBooks: (filters) => {
        set({ error: null });

        try {
            const validFiltersKeys = ["status", "ownership"];

            Object.keys(filters).forEach((key) => {
                if (!validFiltersKeys.includes(key)) {
                    throw new Error(`Invalid filter criteria passed (${key}).`);
                }
            });

            let queryResult = get().books;

            if (filters.ownership) {
                queryResult = queryResult.filter(
                    (book) =>
                        book.ownership.trim().toLowerCase() ===
                        filters.ownership.trim().toLowerCase()
                );
            }
            if (filters.status) {
                queryResult = queryResult.filter(
                    (book) =>
                        book.status.trim().toLowerCase() ===
                        filters.status.trim().toLowerCase()
                );
            }

            return queryResult;
        } catch (error) {
            set({ error: error.message });
            console.error(`Error Filtering books: ${error}`);
        }
    },
}));

export const useInitializeBooks = () => {
    const fetchBooks = useBookStore((state) => state.fetchBooks);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);
};

export default useBookStore;
