import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { bookShapeType } from "../../utils/propTypes/propTypes";

import styles from "./BookList.module.css";

import InfoCard from "../../components/ui/InfoCard";
import TagCard from "../../components/ui/TagCard";
import MoreOptions from "../../components/ui/MoreOptions";
import Button from "../../components/ui/Button";

const moreOptionsMap = {
    viewBook: "Ver o livro",
    update: "Editar o livro",
    remove: "Remover o livro",
};

/**
 * Renders a book list with all the provided books. When the fetching is in process,
 * this component renders a visual feedback with some blank cards,
 *
 * @param {Object} props - The properties of the component.
 * @param {Array<bookShapeType>} props.visibleBooks - An array containing the books to
 * be displayed inside the component.
 * @param {boolean} props.isFetchFinished - The success fetch status of the request.
 * @param {boolean} props.isMobile - A boolean value representing if the layout of the book list
 * should be addapted to mobile screens or desktop screens.
 * @param {Function} props.onMoreOptionsClick - Handles the click on the more options. To this 
 * function, is passed two arguments: the `action` and the `bookId`.
 * - **`action`**: the action of the clicked button. Possible values are `"update"`, `"remove"` or
 * `"viewBook"`.
 * - **`bookId`**: the ID of the book where the more options was clicked.
 *
 * @returns {JSX.Element} A JSX element representing the book list component.
 */
function BookList({ visibleBooks, isFetchFinished, isMobile, onMoreOptionsClick }) {
    const [isBooksExpanded, setIsBooksExpanded] = useState(false);
    const [canShowToTop, setCanShowToTop] = useState(false);
    const bookListItemsRef = useRef(null);

    const INITIAL_BOOKS_VISIBLE = isMobile ? 3 : 6;
    const canShowMoreButton = visibleBooks.length > INITIAL_BOOKS_VISIBLE;

    useEffect(() => {
        const handleScroll = () => {
            if (!bookListItemsRef.current) return;

            const { top } = bookListItemsRef.current.getBoundingClientRect();

            if (top < window.innerHeight - 700 && isBooksExpanded) {
                setCanShowToTop(true);
            } else {
                setCanShowToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isBooksExpanded]);

    const handleToTopClick = () => {
        if (!bookListItemsRef.current) return;

        bookListItemsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            {canShowToTop && (
                <div className={styles.bookList__toTopBtn}>
                    <Button onClick={handleToTopClick}>
                        Voltar para o topo
                    </Button>
                </div>
            )}

            <div
                className={styles.bookList__items}
                ref={bookListItemsRef}
                id="bookList__items"
            >
                {isFetchFinished ? (
                    <>
                        {visibleBooks
                            .slice(
                                0,
                                isBooksExpanded ? -1 : INITIAL_BOOKS_VISIBLE
                            )
                            .map((book) => (
                                <InfoCard
                                    alignment="left"
                                    key={book.id}
                                >
                                    <h3 className={styles.book__title}>
                                        {book.title}
                                    </h3>
                                    <p className={styles.book__author}>
                                        {book.author}
                                    </p>

                                    <div
                                        className={
                                            styles.book__btnIconContainer
                                        }
                                    >
                                        <MoreOptions
                                            options={moreOptionsMap}
                                            onSelect={(action) =>
                                                onMoreOptionsClick(
                                                    action,
                                                    book.id
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <TagCard
                                            key={`tagCard-${book.id}`}
                                            genre={book.genre}
                                        />

                                        <hr className={styles.book__line} />
                                    </div>

                                    <div className={styles.book__infoContainer}>
                                        <p className={styles.bookInfo}>
                                            <span
                                                className={
                                                    styles.bookInfo__label
                                                }
                                            >
                                                Começou em
                                            </span>
                                            <strong
                                                className={
                                                    styles.bookInfo__data
                                                }
                                            >
                                                {book.startDate}
                                            </strong>
                                        </p>
                                        <p className={styles.bookInfo}>
                                            <span
                                                className={
                                                    styles.bookInfo__label
                                                }
                                            >
                                                Terminou em
                                            </span>
                                            <strong
                                                className={
                                                    styles.bookInfo__data
                                                }
                                            >
                                                {book.endDate}
                                            </strong>
                                        </p>
                                        <p className={styles.bookInfo}>
                                            <span
                                                className={
                                                    styles.bookInfo__label
                                                }
                                            >
                                                Posse do livro
                                            </span>
                                            <strong
                                                className={
                                                    styles.bookInfo__data
                                                }
                                            >
                                                {book.ownership}
                                            </strong>
                                        </p>
                                        <p className={styles.bookInfo}>
                                            <span
                                                className={
                                                    styles.bookInfo__label
                                                }
                                            >
                                                Nota do livro
                                            </span>
                                            <strong
                                                className={
                                                    styles.bookInfo__data
                                                }
                                            >
                                                {book.rating}
                                            </strong>
                                        </p>
                                    </div>
                                </InfoCard>
                            ))}

                        {/* Only shows the button if the number of visible cards (visibleBooks.length) 
                    is greater than 'INITIAL_BOOKS_VISIBLE' */}
                        {canShowMoreButton && (
                            <div
                                className={
                                    styles.bookList__moreBooksBtnWrapper
                                }
                            >
                                <Button
                                    bgColor="var(--surface-color)"
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
                    </>
                ) : (
                    Array.from({ length: INITIAL_BOOKS_VISIBLE }).map(
                        (_, index) => (
                            <InfoCard key={index}>
                                <div className={styles.loadingContainer}></div>
                            </InfoCard>
                        )
                    )
                )}
            </div>
        </>
    );
}

BookList.propTypes = {
    visibleBooks: PropTypes.arrayOf(PropTypes.shape(bookShapeType)).isRequired,
    isFetchFinished: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onMoreOptionsClick: PropTypes.func.isRequired,
};

export default BookList;
