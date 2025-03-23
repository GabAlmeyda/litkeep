import PropTypes from "prop-types";
import styles from "./TextArea.module.css";

function TextArea({ placeholder = "Digite aqui", handleChange, name, value }) {
    return (
        <textarea
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={value}
            className={styles.textArea}
        ></textarea>
    );
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.string.isRequired,
};

export default TextArea;
