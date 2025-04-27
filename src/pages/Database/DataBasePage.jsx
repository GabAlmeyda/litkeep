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
    startDate: "Início da leitura",
    endDate: "Fim da leitura",
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

function DataBasePage() {
    const {
        books,
        fetchStatus,
        filterBooks,
        addBook,
        removeBook,
        updateBook,
        searchBooks,
    } = useBookStore((state) => state);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [bookToastInfo, setBookToastInfo] = useState({
        action: undefined,
        status: undefined,
    });
    const [bookData, setBookData] = useState(initialBookData);

    const bookIdsArray = books.map((book) => book.id);

    useEffect(() => {
        const func = (e) => {
            if (e.ctrlKey && e.key === "d") {
                e.preventDefault();
                console.log(bookData);
            }
        };

        document.documentElement.addEventListener("keydown", func);

        return () =>
            document.documentElement.removeEventListener("keydown", func);
    }, [bookData]);

    useInitializeBooks();

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
                const statusError = ["update", "remove"].includes(action)
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

                // early return
                return;
            case "searchByAuthor":
                setFilteredBooks(searchBooks("author", normalizedBook.author));

                // early return
                return;
        }

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
            } else {
                setBookToastInfo({
                    action: undefined,
                    status: undefined,
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
                console.log(filter);
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
                <section className={styles.form}>
                    {bookToastInfo.action && (
                        <BookToast {...bookToastInfo} key={Date.now()} />
                    )}

                    <hr />

                    <BookForm
                        bookData={bookData}
                        dropdownOptions={genreOptions}
                        bookIdsArray={bookIdsArray}
                        onChange={handleInputChange}
                        onAction={handleBookFormAction}
                    />

                    <hr />

                    <Dropdown
                        optionsValues={dropdownOptions}
                        onSelect={handleFilterBooks}
                        name="filterOption"
                    />

                    <BookTable
                        headings={headingsMap}
                        bookArray={filteredBooks}
                        onDoubleClick={handleTableDoubleClick}
                    />
                </section>
            </main>
        </>
    );
}

export default DataBasePage;
