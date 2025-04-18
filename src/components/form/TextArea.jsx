import PropTypes from "prop-types";
import styles from "./TextArea.module.css";
import clsx from "clsx";

/**
 * Renders a custom controlled text area input field.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} [props.placeholder="Digite aqui"] - The placeholder text inside the text
 * area input. Default to "Digite aqui" if no provided.
 * @param {string} [props.errorMessage] - The error message to be displayed below the text
 * area input. If no error message is provided or is a falsy value, no message will be displayed.
 * @param {Function} props.onChange - The function to handle the text
 * area input changes. This function receives an event as an argument.
 * @param {string} props.name - The name attribute of the input field, to manage
 * forms data.
 * @param {string} props.value - The controlled value of the text area input.
 * @param {string} props.id - The id attribute for the element.
 *
 * @example
 * const [textareaValue, setTextareaValue] = useState("");
 * const handleTextareaChange = (e) => setTextareaValue(e.target.value);
 *
 * <Textarea
 *     placeholder="Insira seu comentário"
 *     onChange={handleTextareaChange}
 *     name="coment"
 *     value={textareaValue}
 * />
 *
 * @returns
 */
function TextArea({
    placeholder = "Digite aqui",
    errorMessage,
    onChange,
    name,
    value,
    id,
}) {
    return (
        <label htmlFor={id} className={styles.label}>
            <textarea
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
                id={id}
                className={clsx(
                    styles.textArea,
                    errorMessage && styles.errorTextarea
                )}
                aria-invalid={errorMessage ? "true" : "false"}
                aria-describedby={errorMessage ? `${name}-error` : undefined}
            ></textarea>
            {errorMessage && (
                <p
                    className={styles.errorMessage}
                    aria-live="polite"
                    id={`${name}-error`}
                >
                    {errorMessage}
                </p>
            )}
        </label>
    );
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default TextArea;
