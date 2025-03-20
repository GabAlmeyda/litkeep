import PropTypes from "prop-types";
import styles from "./TagCard.module.css";

/**
 * Renders a small tag card that visually representing a book genre with 
 * a corresponding background color.
 *
 * @param {object} props - The properties of the component.
 * @param {string} props.genre - The genre to be displayed on the tag. If the
 * provided genre is not recognize, a placeholder color will be used, with the
 * "PLACEHOLDER" text.
 *
 * @returns {JSX.Element} A JSX element representing the tag card component.
 */
function TagCard ({ genre }) {
    const genreBackgroundMap = {
        Romance: "#FF5733",
        Drama: "#FF5733",
        Aventura: "#FF5733",
        "Ficção científica": "#33FF57",
        Fantasia: "#33FF57",
        Distopia: "#33FF57",
        Terror: "#3357FF",
        Mistério: "#3357FF",
        Thriller: "#3357FF",
        Biografia: "#F4D03F",
        História: "#F4D03F",
        Filosofia: "#F4D03F",
        Autoajuda: "#8E44AD",
        Psicologia: "#8E44AD",
        Negócios: "#8E44AD",
        Religião: "#1ABC9C",
        Política: "#1ABC9C",
        Ciência: "#1ABC9C",
        Suspense: "#E74C3C",
        Crime: "#E74C3C",
        Policial: "#E74C3C",
        Humor: "#3498DB",
        Infantil: "#2ECC71",
        "Jovem adulto": "#2ECC71",
        Poesia: "#9B59B6",
        PLACEHOLDER: "#FF0000",
    };

    if (!Object.keys(genreBackgroundMap).includes(genre)) {
        console.warn(`The genre '${genre}' isn't recognize in 'TagCard' component. Defaulting to 'PLACEHOLDER'.`);
        genre = "PLACEHOLDER";
    }

    return (
        <div className={styles.tagCard} style={{backgroundColor: genreBackgroundMap[genre]}}>
            <span className={styles.tagCard__circle}></span>
            <p className={styles.tagCard__label}>{genre}</p>
        </div>
    );
}

TagCard.propTypes = {
    genre: PropTypes.string.isRequired,
};

export default TagCard;
