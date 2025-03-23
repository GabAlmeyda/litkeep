import { useEffect } from "react";

import styles from "./DataBasePage.module.css";

import Header from "../../components/layout/Header";

import BookForm from "./BookForm";

const metaTags = [
    {
        name: "description",
        content:
            "Adicione qualquer livro rapidamente! Tenha acesso a coleção e remova, atualize ou filtre os livros que achar necessário.",
    },
    { name: "robots", content: "noindex, nofollow" },
];

function DataBasePage() {
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

    return (
        <>
            <Header />

            <section className={styles.form}>

                <hr />

                <BookForm />
            </section>
        </>
    );
}

export default DataBasePage;
