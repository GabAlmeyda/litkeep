import { create } from "zustand";

import { getServerPaths } from "../utils/constants/paths";

const serverPaths = getServerPaths();

const useBookStore = create((set) => ({
	books: [],
	
	/**
	 * @typedef {Object} Book
	 * @property {string} title - The book's title;
	 * @property {string} author - The name of the book's author;
	 * @property {string} genre - The book's genre;
	 * @property {string} rating - the book's rating. The possible values are:
	 * - a number between 0-10;
	 * - the string 'Abandoned', if the user has abandoned the book;
	 * - an empty string, if the user has not read the book;
	 * @property {boolean} ownership - The ownership status of the book. Can be 'true'
	 * if the user owns the book, or 'false' with they don't.
	 * @property {string} startDate - The start date of the reading.
	 * @property {string} endDate - The end date of the reading.
	 */

	/**
	 * Adds a book to the local store and to the backend server
	 * 
	 * @async
	 * @param {Book} newBook - The book to the added to the database.
	 * 
	 * @throws {Error} - Throws an error if the HTTP request fails.
	 */
    addBook: async (newBook) => {
        try {
            const response = await fetch(serverPaths.books, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook),
			});
			
			if (!response.ok) {
				throw new Error(`Request error: ${response.status} ${response.statusText}`);
			}

            const savedBook = await response.json();
            set((state) => ({ books: [...state.books, savedBook] }));
		}
		catch (error) {
			console.error(`Error adding book: ${error}`);
		}
    },

	/**
	 * Removes a book from the local store and from the backend server.
	 * 
	 * @async
	 * @param {number} bookId - The book's ID.
	 * 
	 * @throws {Error} throws an error if the HTTP request fails.
	 */
	removeBook: async (bookId) => {
		try {
			const response = await fetch(`${serverPaths.books}/${bookId}`, {
				method: "DELETE"
			});

			if (!response.ok) {
				throw new Error(`Request error: ${response.status} ${response.statusText}`);
			}

			set((state) => ({ books: state.books.filter(book => book.id !== bookId) }));
		}
		catch (error) {
			console.error(`Error removing book: ${error}`)
		}
	},

	/**
	 * Updates a book from the local store and from the backend server.
	 * 
	 * @async
	 * @param {Book} book - The updated book.
	 * 
	 * @throws {Error} - Throws an error if the HTTP request fails.
	 */
	updateBook: async (book) => {
		try {
			const response = await fetch(`${serverPaths.books}/${book.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(book)
			});

			if (!response.ok) {
				throw new Error(`Request error: ${response.status} ${response.statusText}`);
			}

			const updatedBook = await response.json();
			set((state) => ({books: [...state.books.map(book => book.id === updatedBook.id ? updatedBook : book)]}))
		}
		catch (error) {
			console.error(`Error updating book: ${error}`);
		}
	},

	/**
	 * Searchs all books with the corresponding book's title or author's name.
	 * 
	 * @async
	 * @param {string} queryType - The field to be searched. The possible values are
	 * listed bellow:
	 * - **author**;
	 * - **title**.
	 * @param {string} text - The text to be search across the database.
	 * 
	 * @returns {Array<Book>} Returns an array with the books.
	 */
	searchBooks: (queryType, text) => {
		const validQueryTypes = ["author", "title"];

		if (!validQueryTypes.includes(queryType)) {
			throw new Error(`Invalid 'queryType' provided (${queryType}). The 'queryType' must be either 'author' or 'title'.`);
		}

		const queryResult = get().books.filter(book => book[queryType].includes(text));

		return queryResult;
	},

	/**
	 * Filters the books based on the provided filters.
	 * 
	 * This function accepts an object with key-value pairs to return
	 * the books that matches the specified conditions.
	 * 
	 * @param {Object} filters - An object containing filters criteria for the books;
	 * @param {string} [filters.ownership] - The ownership status for the books. The values 
	 * are listed bellow:
	 * - **true**;
	 * - **false**.
	 * @param {string} [filters.status] - The status of the book. The values are listed bellow:
	 * - **read**;
	 * - **unread**;
	 * - **abandoned**;
	 */
	filterBooks: (filters) => {
		const validFiltersKeys = ["status", "ownership"];

		Object.keys(filters).forEach(key => {
			if (!validFiltersKeys.includes(key)) {
				throw new Error(`Invalid filter criteria passed (${key}).`)
			}
		});

		let queryResult = get().books;

		if (filters.ownership) {
			queryResult = queryResult.filter(book => book.ownership === filters.ownership);
		}
		if (filters.status) {
			queryResult = queryResult.filter(book => book.status === filters.status);
		}

		return queryResult;
	}
}));

export default useBookStore;
