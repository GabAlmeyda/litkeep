import { useEffect, useState } from "react";

import { MdOutlineStarPurple500 } from "react-icons/md";

import { getWebsitePaths } from "../utils/constants/paths";

import useBookStore from "../stores/bookStore";

import styles from "./Homepage.module.css";

import LinkButton from "../components/ui/LinkButton";
import Header from "../components/layout/Header";
import InfoCard from "../components/ui/InfoCard";
import TagCard from "../components/ui/TagCard";

const metaTags = [
    {
        name: "description",
        content:
            "Cadastre de forma gratuita seus livros. Tenha acesso rápido ao livros cadastrados e as informações do melhor livro que leu.",
    },
    { name: "robots", content: "index, follow" },
];

function Homepage() {
    const books = useBookStore((state) => state.books);
    const filterBooks = useBookStore((state) => state.filterBooks);
    const fetchBooks = useBookStore((state) => state.fetchBooks);

    const [bestBook, setBestBook] = useState(undefined);
    const [isFetchFinished, setIsFetchFinished] = useState(false);

    // Fetches books from the server and updates the fetch status
    useEffect(() => {
        const fetchAndSetBooks = async () => {
            setIsFetchFinished(false);
            await fetchBooks();
            setIsFetchFinished(true);
        };

        fetchAndSetBooks();
    }, []);

    // Updates the 'bestBook' when the fetch status is 'true'
    {
        /*
        bestBook === undefined: bestBook wasn't selected (waiting for the fetch result);
        bestBook === null: bestBook doesn't exist (books is empty);
        others: books isn't empty and the bestBook was selected.
    */
    }
    useEffect(() => {
        if (isFetchFinished) {
            if (books.length === 0) {
                setBestBook(null);
                return;
            }

            const bestBookRating = books.reduce(
                (best, book) =>
                    !best || book.rating > best.rating ? book : best,
                null
            );

            setBestBook(bestBookRating);
        }
    }, [books]);

    // Updates the <meta> tags
    useEffect(() => {
        document.title = "LitKeep";

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

    const websitePaths = getWebsitePaths();

    return (
        <>
            <Header />

            <section className={styles.information}>
                <h2>Informações Gerais</h2>

                {bestBook === undefined ? (
                    <div className={styles.loadingContainer}>
                        <p>Carregando...</p>
                    </div>
                ) : bestBook === null ? (
                    <div className={styles.noInfoContainer}>
                        <p>Parece que você não tem livros na sua lista.</p>

                        <LinkButton
                            to={websitePaths.database}
                            label="Adicione um livro"
                            color="accent"
                        />
                    </div>
                ) : (
                    <div className={styles.infoContainer}>
                        <InfoCard alignment="center">
                            <div className={styles.bestBook}>
                                <h3 className={styles.bestBook__title}>
                                    {bestBook.title}
                                </h3>
                                <h4 className={styles.bestBook__author}>
                                    {bestBook.author}
                                </h4>

                                <div className={styles.bestBook__icon}>
                                    <MdOutlineStarPurple500 />
                                    <h3>{bestBook.rating}</h3>
                                </div>

                                <p>Melhor pontuação</p>

                                <hr />

                                <span className={styles.bestBook__tag}>
                                    <TagCard />
                                </span>

                                <LinkButton
                                    to={`${websitePaths.book}/${bestBook.id}`}
                                    label="Acesse o livro"
                                    color="accent"
                                />
                            </div>
                        </InfoCard>

                        <div className={styles.infoCardsContainer}>
                            <InfoCard alignment="center">
                                <h3 className={styles.infoCard__num}>53</h3>
                                <p className={styles.inforCard__label}>
                                    Livros Registrados
                                </p>
                            </InfoCard>
                            <InfoCard alignment="center">
                                <h3 className={styles.infoCard__num}>50</h3>
                                <p className={styles.inforCard__label}>
                                    Livros em sua Posse
                                </p>
                            </InfoCard>
                        </div>
                        <div className={styles.infoCardsContainer}>
                            <InfoCard alignment="center">
                                <h3 className={styles.infoCard__num}>49</h3>
                                <p className={styles.inforCard__label}>
                                    Livros já Lidos
                                </p>
                            </InfoCard>
                            <InfoCard alignment="center">
                                <h3 className={styles.infoCard__num}>2</h3>
                                <p className={styles.inforCard__label}>
                                    Livros Abandonados
                                </p>
                            </InfoCard>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

export default Homepage;
