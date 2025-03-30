import { useEffect, useState } from "react";

import useBookStore, { useInitializeBooks } from "../../stores/bookStore";
import { genreColorsMap } from "../../utils/constants/books";

import styles from "./DataBasePage.module.css";

import Header from "../../components/layout/Header";

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

function DataBasePage() {
    const { books } = useBookStore((state) => state);
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

    const handleChange = (name, value) => {
        setBookData((prevData) => ({ ...prevData, [name]: value }));
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

                    <BookTable headings={headingsMap} bookArray={books} />
                </section>
            </main>
        </>
    );
}

export default DataBasePage;
