import { useEffect, useState } from "react";

import { getWebsitePaths } from "../../utils/constants/paths";
import useWindowSize from "../../utils/hooks/useWindowSize";

import useBookStore, { useInitializeBooks } from "../../stores/bookStore";

import styles from "./Homepage.module.css";

import LinkButton from "../../components/ui/LinkButton";
import InfoCard from "../../components/ui/InfoCard";
import Header from "../../components/layout/Header";
import ServerErrorScreen from "../../components/layout/ServerErrorScreen";
import Dropdown from "../../components/form/Dropdown";
import Button from "../../components/ui/Button";

import BestBookCard from "./BestBookCard";
import AdditionalInfoCards from "./AdditionalInfoCards";
import BookList from "./BookList";

const metaTags = [
    {
        name: "description",
        content:
            "Cadastre de forma gratuita seus livros. Tenha acesso rápido ao livros cadastrados e as informações do melhor livro que leu.",
    },
    { name: "robots", content: "index, follow" },
];

const dropdownOptions = {
    registered: "Todos registrados",
    read: "Livros lidos",
    unread: "Livros não lidos",
    abandoned: "Livros abandonados",
    ownership: "Livros em posse",
};

function Homepage() {
    const { books, fetchStatus, filterBooks } = useBookStore((state) => state);

    // bestBook === undefined: 'bestBook' wasn't selected (waiting for the fetch result);
    // bestBook === null: 'bestBook' doesn't exist (books is empty);
    // bestBook === {...}: 'bestBook' was selected (books isn't empty).
    const [bestBook, setBestBook] = useState(undefined);
    const [additionalInfo, setAdditionalInfo] = useState(
        Array.from({ length: 4 }, () => null)
    );
    const [isBooksExpanded, setIsBooksExpanded] = useState(false);

    const windowSize = useWindowSize();

    const WEBSITE_PATHS = getWebsitePaths();

    const isMobile = windowSize.width < 700;
    const visibleBooks = isBooksExpanded
        ? books
        : books.slice(0, isMobile ? 3 : 6);
    const canShowMoreButton = books.length > (isMobile ? 3 : 6);

    useInitializeBooks();
    // Updates the 'bestBook' and the 'additionalInfo' when the 'fetchStatus' is "success"
    useEffect(() => {
        if (fetchStatus === "success") {
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

            setAdditionalInfo([
                { num: books.length, label: "Livros Registrados" },
                {
                    num: filterBooks({ ownership: true }).length,
                    label: "Livros em sua posse",
                },
                {
                    num: filterBooks({ status: "unread" }).length,
                    label: "Livros não Lidos",
                },
                {
                    num: filterBooks({ status: "read" }).length,
                    label: "Livros já Lidos",
                },
            ]);
        }
    }, [books, fetchStatus, filterBooks]);

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

    // Handle error: early return to stop rendering the rest of the component
    if (fetchStatus === "error") {
        return (
            <>
                <Header />

                <ServerErrorScreen />
            </>
        );
    }

    return (
        <>
            <Header />

            <main>
                <section className={styles.information}>
                    <h2>Informações Gerais</h2>

                    {/* If 'books' is empty (no books added) */}
                    {fetchStatus === "success" && books.length === 0 ? (
                        <div className={styles.noInfoContainer}>
                            <p>Parece que você não tem livros na sua lista.</p>

                            <div className={styles.linkButtonContainer}>
                                <LinkButton
                                    to={WEBSITE_PATHS.database}
                                    label="Adicione um livro"
                                    color="accent"
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className={styles.infoContainer}
                            aria-busy={
                                fetchStatus === "loading" ||
                                fetchStatus === "idle"
                            }
                        >
                            <InfoCard alignment="center">
                                <BestBookCard
                                    bestBook={bestBook}
                                    isFetchFinished={
                                        fetchStatus === "success" && bestBook
                                    }
                                />
                            </InfoCard>

                            <AdditionalInfoCards
                                additionalInfo={additionalInfo}
                                isFetchFinished={fetchStatus === "success"}
                            />
                        </div>
                    )}
                </section>

                <section className={styles.bookList}>
                    <h2>Livros Registrados</h2>

                    <div className={styles.bookList__btns}>
                        <Dropdown optionsValues={dropdownOptions} />

                        <LinkButton
                            to={WEBSITE_PATHS.database}
                            label="Adicione um livro"
                        />
                    </div>

                    <BookList
                        visibleBooks={visibleBooks}
                        isMobile={isMobile}
                        isFetchFinished={fetchStatus === "success"}
                    />

                    {/* Only shows the button if the number of visible cards (books.length) 
                    is greater than 3, for mobile, and 6, for desktop */}
                    {canShowMoreButton && (
                        <div className={styles.bookList__showMoreBtnContainer}>
                            <Button
                                bgColor="#a202f0"
                                aria-controls="bookList__items"
                                aria-expanded={isBooksExpanded}
                                onClick={() =>
                                    setIsBooksExpanded(!isBooksExpanded)
                                }
                            >
                                {isBooksExpanded ? "Ver menos" : "Ver mais"}
                            </Button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

export default Homepage;
