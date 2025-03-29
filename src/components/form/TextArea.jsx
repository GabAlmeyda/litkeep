import PropTypes from "prop-types";
import styles from "./TextArea.module.css";

/**
 * Renders a custom controlled text area input field.
 * 
 * @param {object} props - The properties of the component.
 * @param {string} [props.placeholder="Digite aqui"] - The placeholder text inside the text 
 * area input. Default to "Digite aqui" if no provided.
 * @param {Function} props.handleChange - The function to handle the text 
 * area input changes. This function receives an event as an argument.
 * @param {string} props.name - The name attribute of the input field, to manage
 * forms data. 
 * @param {string} props.value - The controlled value of the text area input.
 * 
 * @example
 * const [textareaValue, setTextareaValue] = useState("");
 * const handleTextareaChange = (e) => setTextareaValue(e.target.value);
 * 
 * <Textarea 
 *     placeholder="Insira seu comentário"
 *     handleChange={handleTextareaChange}
 *     name="coment"
 *     value={textareaValue}
 * />
 *  
 * @returns 
 */
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
