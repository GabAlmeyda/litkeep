import { useEffect, useState } from "react";

import useBookStore, { useInitializeBooks } from "../../stores/bookStore";
import { genreColorsMap } from "../../utils/constants/books";

import styles from "./DataBasePage.module.css";

import Header from "../../components/layout/Header";

import BookForm from "./BookForm";
import BookTable from "./BookTable";
import Dropdown from "../../components/form/Dropdown";
import ServerErrorScreen from "../../components/layout/ServerErrorScreen";

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

function DataBasePage() {
    const { books, fetchStatus, filterBooks } = useBookStore((state) => state);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: genreOptions[0],
        rating: "",
        status: "",
        ownership: "",
        startDate: "",
        endDate: "",
    });

    useInitializeBooks();

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

    const handleChange = (name, value) => {
        setBookData((prevData) => ({ ...prevData, [name]: value }));
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

    return (
        <>
            <Header />

            <main>
                <section className={styles.form}>
                    <hr />

                    <BookForm
                        bookData={bookData}
                        dropdownOptions={genreOptions}
                        handleChange={handleChange}
                    />

                    <hr />

                    <Dropdown
                        optionsValues={dropdownOptions}
                        handleSelect={handleFilterBooks}
                        name="filterOption"
                    />

                    <BookTable
                        headings={headingsMap}
                        bookArray={filteredBooks}
                    />
                </section>
            </main>
        </>
    );
}

export default DataBasePage;
