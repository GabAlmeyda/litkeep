import { getWebsitePaths } from "../../utils/constants/paths";
import { bookShapeType } from "../../utils/propTypes/propTypes";

import styles from "./BestBookCard.module.css";

import { MdOutlineStarPurple500 } from "react-icons/md";

import TagCard from "../../components/ui/TagCard";
import LinkButton from "../../components/ui/LinkButton";
import PropTypes from "prop-types";

/**
 * Renders a card for the book with the best rating. If the fetch is in
 * proccess, this component renders a blank card as a feedback. If the `bestBook`
 * is a falsy value and the `isFetchFinished` is `true`, it means that there are no books with a
 * numeric rating and the card won't be displayed.
 *
 * @param {Object} props - The properties of the component.
 * @param {bookShapeType} props.bestBook - The book with the best rating.
 * @param {boolean} props.isFetchFinished - The success fetch status of the request.
 *
 * @returns {JSX.Element} A JSX element representing the best book's card
 * component.
 */
function BestBookCard({ bestBook, isFetchFinished }) {
    const websitePaths = getWebsitePaths();

    return (isFetchFinished && bestBook) ? (
        <div className={styles.bestBook}>
            <h3 className={styles.bestBook__title}>{bestBook.title}</h3>
            <h4 className={styles.bestBook__author}>{bestBook.author}</h4>

            <div
                className={styles.bestBook__icon}
                aria-label="Estrela amarela com a nota do melhor livro no interior"
            >
                <MdOutlineStarPurple500 aria-hidden="true" />
                <h3 aria-describedby="best-rating">{bestBook.rating}</h3>
            </div>
            <p id="best-rating">Melhor pontuação</p>
            <hr />

            <span className={styles.bestBook__tag}>
                <TagCard genre={bestBook.genre} />
            </span>

            <div className={styles.bestBook__linkBtnContainer}>
                <LinkButton
                    to={`${websitePaths.book}/${bestBook.id}`}
                    label="Acesse o livro"
                    color="accent"
                />
            </div>
        </div>
    ) : !isFetchFinished ? (
        <div
            className={styles.loadingContainer}
            aria-live="polite"
            role="status"
        >
            Carregando...
        </div>
    ) : null;
}

BestBookCard.propTypes = {
    bestBook: PropTypes.shape(bookShapeType).isRequired,
    isFetchFinished: PropTypes.bool.isRequired,
};

export default BestBookCard;
