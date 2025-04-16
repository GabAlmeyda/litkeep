import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useBookStore, { useInitializeBooks } from "../../stores/bookStore";
import { genreColorsMap } from "../../utils/constants/books";

import styles from "./DataBasePage.module.css";

import Header from "../../components/layout/Header";
import Dropdown from "../../components/form/Dropdown";
import ServerErrorScreen from "../../components/layout/ServerErrorScreen";
import BookToast from "../../components/ui/BookToast";

import BookForm from "./BookForm";
import BookTable from "./BookTable";

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
    unread: "Livros não lidos",
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
};

function DataBasePage() {
    const {
        books,
        fetchStatus,
        addBook,
        removeBook,
        updateBook,
        searchBooks,
        filterBooks,
    } = useBookStore((state) => state);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [bookToastInfo, setBookToastInfo] = useState({
        action: null,
        status: null,
    });
    const [bookData, setBookData] = useState(initialBookData);

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
    };

    const handleBookFormAction = (action) => {
        switch (action) {
            case "add":
                addBook({ ...bookData, id: uuidv4() });
                break;

            case "update":
                if (!bookData.id) {
                    setBookToastInfo({
                        action: "update",
                        status: "notFound",
                    });
                    return;
                }

                updateBook(bookData);
                break;

            case "remove":
                if (!bookData.id) {
                    setBookToastInfo({
                        action: "remove",
                        status: "notFound",
                    });
                    return;
                }

                //confirmation to remove the book

                removeBook(bookData.id);
                break;

            case "searchByTitle":
                searchBooks("title", bookData.title);
                break;

            case "searchByAuthor":
                searchBooks("author", bookData.author);
                break;

            case "clear":
                setBookData(initialBookData);
                break;

            default:
                console.error(
                    `Invalid action '${action}' received from 'BookForm' component.`
                );
        }

        if (["add", "update", "remove"].includes(action)) {
            setBookToastInfo({
                action: action,
                status: fetchStatus,
            });
        }
    };

    const handleFilterBooks = (_, filterOption) => {
        switch (filterOption) {
            case "ownership":
                setFilteredBooks(filterBooks({ ownership: true }));
                break;
            case "read":
            case "unread":
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
        setBookData(book);
    };

    return (
        <>
            <Header />

            <main>
                <section className={styles.form}>
                    {bookToastInfo.action && <BookToast {...bookToastInfo} key={Date.now()} />}

                    <hr />

                    <BookForm
                        bookData={bookData}
                        dropdownOptions={genreOptions}
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
