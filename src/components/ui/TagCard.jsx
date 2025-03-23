import PropTypes from "prop-types";

import { genreColorsMap } from "../../utils/constants/books";

import styles from "./TagCard.module.css";

/**
 * Renders a small tag card represeting a book genre. The background color is
 * dymanically assigned based on the genre, as defined in the 'genreColorsMap' object.
 *
 * @param {object} props - The properties of the component.
 * @param {string} props.genre - The genre to be displayed on the tag card. If a invalid
 * genre is provided, the genre is default to the first option avaliable in the 'genreColorsMap'
 * object.
 *
 * @returns {JSX.Element} A JSX element representing the tag card component.
 */
function TagCard({ genre }) {
    const validGenres = Object.keys(genreColorsMap);

    if (!validGenres.includes(genre)) {
        console.warn(
            `The genre '${genre}' isn't recognized in 'TagCard' component. Defaulting to '${validGenres[0]}'.`
        );
        genre = validGenres[0];
    }

    return (
        <div
            className={styles.tagCard}
            style={{ backgroundColor: genreColorsMap[genre] }}
        >
            <span className={styles.tagCard__circle}></span>
            <p className={styles.tagCard__label}>{genre}</p>
        </div>
    );
}

TagCard.propTypes = {
    genre: PropTypes.string.isRequired,
};

export default TagCard;
