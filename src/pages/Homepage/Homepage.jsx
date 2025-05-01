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
    notRead: "Livros não lidos",
    abandoned: "Livros abandonados",
    ownership: "Livros em posse",
};

/**
 * Renders a Homepage to display the best book's information, additional information
 * about the registered books and the list containing information about the registered
 * books.
 *
 * ## Features
 * - A card to display the best book's information.
 * - Four cards displaying information about the registered books:
 *   - Number of registered books.
 *   - Number of read books.
 *   - Number of unread books.
 *   - Number of abandoned books.
 * - A expansive list containing information about all the registered books.
 *
 * ## Actions
 * - A dropdown element to filter the displayed books.
 * - A button to add another book.
 * - A button to expande the list.
 *
 *
 * @returns {JSX.Element} A JSX element representing the website's homepage.
 */
function Homepage() {
    const { books, fetchStatus, filterBooks } = useBookStore((state) => state);

    // bestBook === undefined: 'bestBook' wasn't selected (waiting for the fetch result);
    // bestBook === null: 'bestBook' doesn't exist (books is empty or all books have no numeric rating);
    // bestBook === {...}: 'bestBook' was selected (books isn't empty).
    const [bestBook, setBestBook] = useState(undefined);
    const [additionalInfo, setAdditionalInfo] = useState(
        Array.from({ length: 4 }, () => null)
    );
    const [filteredBooks, setFilteredBooks] = useState(books);
    const windowSize = useWindowSize();

    const WEBSITE_PATHS = getWebsitePaths();

    const isMobile = windowSize.width < 700;

    useInitializeBooks();

    // Updates the 'bestBook' and the 'additionalInfo' when the 'fetchStatus' is "success"
    useEffect(() => {
        if (fetchStatus === "success") {
            if (books.length === 0) {
                setBestBook(null);
                return;
            }

            let bestBookByRating = books
                .filter((book) => typeof book.rating === "number")
                .reduce((best, current) => {
                    if (!best || current.rating > best.rating) return current;
                    return best;
                }, null);
            setBestBook(bestBookByRating);
            setAdditionalInfo([
                { num: books.length, label: "Livros Registrados" },
                {
                    num: filterBooks({ ownership: "sim" }).length,
                    label: "Livros em sua posse",
                },
                {
                    num: filterBooks({ status: "notRead" }).length,
                    label: "Livros não lidos",
                },
                {
                    num: filterBooks({ status: "abandoned" }).length,
                    label: "Livros abandonados",
                },
            ]);
            setFilteredBooks(books);
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

    const handleFilterBooks = (_, filterOption) => {
        switch (filterOption) {
            case "ownership":
                setFilteredBooks(filterBooks({ ownership: "sim" }));
                break;
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
                    `Invalid filter criteria '${filterOption}' received in 'HomePage'. Expect one of "read", "notRead", "abandoned", "registered" or "ownership".`
                );
        }
    };

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
                            {fetchStatus === "success" && bestBook === null || (
                                <InfoCard alignment="center">
                                    <BestBookCard
                                        bestBook={bestBook}
                                        isFetchFinished={
                                            fetchStatus === "success"
                                        }
                                    />
                                </InfoCard>
                            )}

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
                        <Dropdown
                            optionsValues={dropdownOptions}
                            onSelect={handleFilterBooks}
                            name="filterOption"
                        />

                        <LinkButton
                            to={WEBSITE_PATHS.database}
                            label="Adicione um livro"
                        />
                    </div>

                    <BookList
                        visibleBooks={filteredBooks}
                        isMobile={isMobile}
                        isFetchFinished={fetchStatus === "success"}
                    />
                </section>
            </main>
        </>
    );
}

export default Homepage;
