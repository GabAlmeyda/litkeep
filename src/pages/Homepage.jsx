import styles from "./Homepage.module.css";

import { getWebsitePaths } from "../utils/constants/paths";

import useBookStore from "../stores/bookStore";

import LinkButton from "../components/ui/LinkButton";

import Header from "../components/layout/Header";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

function Homepage() {
    const books = useBookStore((state) => state.books);
    const filterBooks = useBookStore((state) => state.filterBooks);
    const fetchBooks = useBookStore((state) => state.fetchBooks);

	const [bestBook, setBestBook] = useState(undefined);
	const [isFetchFinished, setIsFetchFinished] = useState(false);

    useEffect(() => {
		const fetchAndSetBooks = async () => {
			setIsFetchFinished(false);
			await fetchBooks();
			setIsFetchFinished(true);
        };

        fetchAndSetBooks();
    }, []);

    useEffect(() => {
		if (isFetchFinished) {
			if (books.length === 0) {
				setBestBook(null);
				return;
			}

			const bestBookRating = books.reduce(
				(best, book) => (!best || book.rating > best.rating ? book : best),
				null
			);

			setBestBook(bestBookRating);
		}
    }, [books]);

    const websitePaths = getWebsitePaths();

    return (
        <>
            <Helmet>
                <meta name="description" content="Cadastre de forma gratuita seus livros. Tenha acesso rápido ao livros cadastrados e as informações do melhor livro que leu."/>
            </Helmet>
            <Header />

            <section className={styles.information}>
                <h2>Informações Gerais</h2>

                {/*
					bestBook === undefined: bestBook wasn't selected (waiting for the fetch result);
					bestBook === null: bestBook doesn't exist (books is empty);
					others: books isn't empty and the bestBook was selected.
				*/}
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
                        <div className={styles.infoContainer__bestBook}>
                            <div className={styles.bestBook__rating}>
                                <p>{bestBook.rating}</p>
                            </div>
                            <h3>{bestBook.title}</h3>
                            <h4>{bestBook.author}</h4>

                            <LinkButton
                                to={`${websitePaths.book}/${bestBook.id}`}
                                label="Acesse o livro"
                                color="accent"
                            />
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

export default Homepage;
