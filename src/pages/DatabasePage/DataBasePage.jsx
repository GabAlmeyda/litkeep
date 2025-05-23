import { useEffect, useState } from "react";

import useBookStore, { useInitializeBooks } from "../../stores/bookStore";
import { genreColorsMap } from "../../utils/constants/books";

import styles from "./DataBasePage.module.css";

import Header from "../../components/layout/Header";
import Dropdown from "../../components/form/Dropdown";
import ServerErrorScreen from "../../components/layout/ServerErrorScreen";
import BookToast from "../../components/ui/BookToast";

import BookForm from "./BookForm";
import BookTable from "./BookTable";
import {
    handleBookAction,
    normalizeBookData,
} from "../../utils/services/bookFormHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { getWebsitePaths } from "../../utils/constants/paths";

const metaTags = [
    {
        name: "description",
        content:
            "Adicione qualquer livro rapidamente! Tenha acesso a coleção e remova, atualize ou filtre os livros que achar necessário.",
    },
    { name: "robots", content: "noindex, nofollow" },
];

const headingsMap = {
    title: "Título",
    author: "Autor",
    rating: "Pontuação",
    genre: "Gênero",
    ownership: "Posse do livro",
    status: "Status do livro",
};
const genreOptions = Object.keys(genreColorsMap);

const dropdownOptions = {
    registered: "Todos registrados",
    read: "Livros lidos",
    notRead: "Livros não lidos",
    abandoned: "Livros abandonados",
    ownership: "Livros em posse",
};

const initialBookData = {
    id: "",
    title: "",
    author: "",
    genre: genreOptions[0],
    rating: "",
    status: "",
    ownership: "",
    startDate: "",
    endDate: "",
    description: "",
};

/**
 * Renders a page that displays a form and table section.
 * The form section is responsible for adding, updating, removing and searching
 * books. The table section is responsible for manage all the registered books info, 
 * with actions like select a book from the table.
 *
 * ## Features:
 * - Allows users to add, update, remove, search, and view registered books.
 * - Displays a form for editing or registering book data.
 * - Shows a table with all books, supporting filtering by status, ownership, and other criteria.
 * - Displays toast notifications (BookToast) for user feedback on actions.
 * - Synchronizes the form state with the selected book from the table.
 * - Dynamically updates the page meta tags.
 *
 * ## Supported actions:
 * - Add, update, and remove books.
 * - Search books by title or author.
 * - View book details.
 * - Filter books by status (read, not read, abandoned, ownership, etc).
 *
 * @returns {JSX.Element} A JSX element The book database management page.
 */
function DataBasePage() {
    const {
        books,
        fetchStatus,
        filterBooks,
        addBook,
        removeBook,
        updateBook,
        searchBooks,
        getBookById,
    } = useBookStore((state) => state);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [bookToastInfo, setBookToastInfo] = useState({
        action: undefined,
        status: undefined,
    });
    const [bookData, setBookData] = useState(initialBookData);
    const navigate = useNavigate();
    const location = useLocation();

    const bookIdsArray = books.map((book) => book.id);
    const WEBSITE_PATHS = getWebsitePaths();

    useInitializeBooks();

    // If a 'bookId' is provided, set the 'bookData' to the book that matches the 
    // ID in the server.
    useEffect(() => {
        if (location.state?.bookId) {
            setBookData(getBookById(location.state.bookId))
        }
    }, [getBookById, location]);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    // Updates the <meta> tags
    useEffect(() => {
        document.title = "LitKeep | Banco de Dados";

        metaTags.forEach(({ name, content }) => {
            let metaTag = document.querySelector(`meta[name=${name}]`);

            if (!metaTag) {
                metaTag = document.createElement("meta");
                metaTag.name = name;
                document.head.appendChild(metaTag);
            }

            metaTag.content = content;
        });
    }, []);

    // Handle error: early return to stop rendering the rest of the component
    if (fetchStatus === "error") {
        return (
            <>
                <Header />

                <ServerErrorScreen />
            </>
        );
    }

    const handleInputChange = (name, value) => {
        setBookData((prevData) => ({ ...prevData, [name]: value }));
        setBookToastInfo({
            action: undefined,
            status: undefined,
        });
    };

    // Calls the appropriate action and shows the toast message based on the action
    // performed
    const handleBookFormAction = (action, errors) => {
        if (errors.err) {
            if (errors.id) {
                const statusError = ["update", "remove", "viewBook"].includes(action)
                    ? "notFound"
                    : "alreadyRegistered";

                setBookToastInfo({
                    action: action,
                    status: statusError,
                });
            }

            return;
        }

        const normalizedBook = !bookData.id
            ? normalizeBookData(bookData)
            : bookData;
        setBookData(normalizedBook);

        switch (action) {
            case "searchByTitle":
                setFilteredBooks(searchBooks("title", normalizedBook.title));
                break;

            case "searchByAuthor":
                setFilteredBooks(searchBooks("author", normalizedBook.author));
                break;

            case "clearId":
                setBookData({
                    ...bookData,
                    id: "",
                });
                break;

            case "viewBook":
                navigate(`${WEBSITE_PATHS.book}/${bookData.id}`, {
                    state: { scrollToTop: true },
                });
        }

        setBookToastInfo({
            action: undefined,
            status: undefined,
        });

        // early return
        if (
            ["searchByAuthor", "searchByTitle", "clearId", "viewBook"].includes(
                action
            )
        )
            return;

        try {
            const bookFunctions = {
                addBook,
                updateBook,
                removeBook,
                searchBooks,
                clearBookData() {
                    setBookData(initialBookData);
                },
            };

            handleBookAction(action, normalizedBook, bookFunctions);

            if (["add", "update", "remove"].includes(action)) {
                setBookToastInfo({
                    action: action,
                    status: fetchStatus,
                });
            }
        } catch (error) {
            console.error(
                `Error in 'DataBasePage' while handling action '${action}':`,
                error
            );
            return;
        }
    };

    const handleFilterBooks = (_, filterOption) => {
        switch (filterOption) {
            case "ownership": {
                const filter = filterBooks({ ownership: "sim" });
                setFilteredBooks(filter);
                break;
            }
            case "read":
            case "notRead":
            case "abandoned":
                setFilteredBooks(filterBooks({ status: filterOption }));
                break;
            case "registered":
                setFilteredBooks(books);
                break;
            default:
                console.error(
                    `Invalid filter criteria '${filterOption}' received in 'DataBasePage'. Expect one of "read", "unread", "abandoned", "registered" or "ownership".`
                );
        }
    };

    // handles the double-click on a table row
    const handleTableDoubleClick = (book) => {
        window.scrollTo(0, 0);

        setBookData(book);
        setBookToastInfo({
            action: undefined,
            status: undefined,
        });
    };

    return (
        <>
            <Header />

            <main>
                <section className={styles.formSection}>
                    {bookToastInfo.action && (
                        <BookToast {...bookToastInfo} key={Date.now()} />
                    )}

                    <BookForm
                        bookData={bookData}
                        dropdownOptions={genreOptions}
                        bookIdsArray={bookIdsArray}
                        onChange={handleInputChange}
                        onAction={handleBookFormAction}
                    />
                </section>

                <hr className={styles.line} />

                <section className={styles.tableSection}>

                    <Dropdown
                        optionsValues={dropdownOptions}
                        onSelect={handleFilterBooks}
                        name="filterOption"
                    />

                    <BookTable
                        headings={headingsMap}
                        booksArray={filteredBooks}
                        onDoubleClick={handleTableDoubleClick}
                    />
                </section>
            </main>
        </>
    );
}

export default DataBasePage;
