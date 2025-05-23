import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useBookStore from "../../stores/bookStore";

import styles from "./SelectedBookPage.module.css";

import { IoArrowBackOutline } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoMdText } from "react-icons/io";
import { PiHandPalmFill } from "react-icons/pi";


import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import TagCard from "../../components//ui/TagCard";

const metaTags = [
    {
        name: "description",
        content: `Confira as informações do livro ${"PLACEHOLDER"} cadastradas. Veja sua nota, sua descrição, o tempo de leitura e muito mais.`,
    },
    { name: "robots", content: "noindex, nofollow" },
];

/**
 * Renders a page containing all the information about a specific book.
 * The book's id is provided by the 'location.state.bookId', and, if the 'bookId'
 * exists, the books is fetched from the server.
 * 
 * ## Displayed info:
 * - Book's title.
 * - Book's author.
 * - Book's genre.
 * - Book's start reading date.
 * - Book's end reading date.
 * - Ownership of the book.
 * - Book's rating. 
 * 
 * @returns {JSX.element} A JSX element representing a page for a specific book.
 */
function SelectedBookPage() {
    const { bookId } = useParams();
    const getBookById = useBookStore((state) => state.getBookById);
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(undefined);
    const bookStatusPhrase = useRef("");

    // updates 'bookData' and 'bookStatusPhrase'
    useEffect(() => {
        const book = getBookById(bookId);

        if (book) {
            const countDaysReading = (startDate, endDate) => {
                const [startDay, startMonth, startYear] = startDate
                    .split("/")
                    .map(Number);
                const [endDay, endMonth, endYear] = endDate
                    .split("/")
                    .map(Number);

                const start = new Date(startYear, startMonth - 1, startDay);
                const end = new Date(endYear, endMonth - 1, endDay);

                const msDiff = end - start;
                const daysDiff = msDiff / (1000 * 60 * 60 * 24);

                return Math.round(daysDiff);
            };
            const daysReading = countDaysReading(book.startDate, book.endDate);

            switch (book.status) {
                case "abandonado":
                    bookStatusPhrase.current =
                        "Livro abandonado antes do final.";
                    break;
                case "reading":
                    bookStatusPhrase.current =
                        daysReading < 1
                            ? "Lendo a menos de um dia."
                            : `Leitura em andamento há ${daysReading} dias.`;
                    break;
                case "notRead":
                    bookStatusPhrase.current = "Leitura ainda não iniciada.";
                    break;
                case "read":
                    bookStatusPhrase.current =
                        daysReading < 1
                            ? "Livro lido em menos de um dia."
                            : `Uma jornada que durou ${daysReading} dias.`;
                    break;
            }
        }

        setBookData(book);
    }, [bookId, getBookById]);

    // Updates the <meta> tags
    useEffect(() => {
        document.title = `LitKeep | ${"PLACEHOLDER"}`;

        metaTags.forEach(({ name, content }) => {
            let metaTag = document.querySelector(`meta[name=${name}`);

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

            <main>
                <section className={styles.bookSection}>
                    <Button
                        bgColor="var(--surface-color)"
                        fontColor="#fff"
                        onClick={() => navigate(-1)}
                    >
                        <IoArrowBackOutline className={styles.backButton} />
                    </Button>

                    {bookData && bookData ? (
                        <div className={styles.book}>
                            <h1 className={styles.book__title}>
                                {bookData.title}
                            </h1>
                            <h2 className={styles.book__author}>
                                {bookData.author}
                            </h2>

                            <TagCard genre={bookData.genre} />
                            <hr />

                            <dl className={styles.book__fieldList}>
                                <div className={styles.field__container}>
                                    <dt className={styles.field__label}>
                                        <IoCalendarClear /> Começou em:
                                    </dt>
                                    <dd className={styles.field__value}>
                                        {bookData.startDate}
                                    </dd>
                                </div>

                                <div className={styles.field__container}>
                                    <dt className={styles.field__label}>
                                        <IoCalendarClear /> Terminou em:
                                    </dt>
                                    <dd className={styles.field__value}>
                                        {bookData.endDate}
                                    </dd>
                                </div>
                            </dl>

                            <p className={styles.book__statusPhrase}>
                                {bookStatusPhrase.current}
                            </p>

                            <dl className={styles.book__fieldList}>
                                <div className={styles.field__container}>
                                    <dt className={styles.field__label}>
                                        <PiHandPalmFill /> Posse do livro:
                                    </dt>
                                    <dd className={styles.field__value}>
                                        {bookData.ownership}
                                    </dd>
                                </div>

                                <div className={styles.field__container}>
                                    <dt className={styles.field__label}>
                                        <FaStar /> Avaliação:
                                    </dt>
                                    <dd className={styles.field__value}>
                                        {bookData.rating}
                                    </dd>
                                </div>

                                <div className={styles.field__container}>
                                    <dt className={styles.field__label}>
                                        <IoMdText /> Comentário:
                                    </dt>
                                    <dd className={styles.field__value}>
                                        {bookData.description}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    ) : (
                        <div className={styles.bookNotFound}>
                            <h2>Oh, não!</h2>
                            <p>O livro não foi encontrado ou não existe.</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default SelectedBookPage;
