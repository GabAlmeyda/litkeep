import PropTypes from "prop-types";
import styles from "./TagCard.module.css";

function TagCard({ label = "PLACEHOLDER" }) {
    return (
        <div className={styles.tagCard}>
            <span className={styles.tagCard__circle}></span>
            <p className={styles.tagCard__label}>{label}</p>
        </div>
    );
}

TagCard.propTypes = {
    label: PropTypes.string,
};

export default TagCard;
