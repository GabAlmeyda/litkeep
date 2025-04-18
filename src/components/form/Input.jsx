import PropTypes from "prop-types";
import styles from "./Input.module.css";
import clsx from "clsx";

const validTypes = [
    "text",
    "password",
    "email",
    "url",
    "number",
    "tel",
    "search",
    "date",
    "month",
    "week",
    "time",
    "datetime-local",
];

/**
 * Renders a custom controlled input field.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.type - The input type. This component accepts the following types:
 * - "text", "password", "email", "url", "number", "tel", "search",
 * - "date", "month", "week", "time", "datetime-local".
 * If no type is provided, the default type is "text".
 * @param {string} [props.placeholder="digite aqui"] - The placeholder text inside of the input.
 * If no placeholder is provided, the default placeholder is "digite aqui".
 * @param {string} [props.errorMessage] - The error message to be displayed below the input field.
 * If no error message is provided or is a falsy value, no message will be displayed.
 * @param {Function} props.onChange - The function to control the input changes,
 * passed to the 'onChange' attribute'. It receives a event as an argument.
 * @param {string} props.name - The name attribute of the input, to manage forms data.
 * @param {any} props.value - The value of the input field, controlled by the parent
 * component. This should match the type of input.
 * @param {string} props.id - The id attribute for the input.
 *
 * @example
 * const [inputValue, setInputValue] = useState("");
 * const handleInputChange = (e) => setInputChange(e.target.value);
 *
 * <Input
 *   type="email"
 *   placeholder="Digite seu email"
 *   onChange={handleInputChange}
 *   name="email"
 *   value={inputValue}
 * />
 *
 * @returns {JSX.Element} A JSX element representing the input field.
 */
function Input({
    type = "text",
    placeholder = "Digite aqui",
    errorMessage,
    onChange,
    name,
    value,
    id,
}) {
    if (!validTypes.includes(type)) {
        console.warn(
            `Invalid type '${type}' received in 'Input' component. Defauting to 'text'.`
        );
        type = "text";
    }

    return (
        <label htmlFor={id} className={styles.label}>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={clsx(
                    styles.input,
                    errorMessage && styles.errorInput
                )}
                name={name}
                value={value}
                id={id}
                autoComplete="off"
                aria-invalid={errorMessage ? "true" : "false"}
                aria-describedby={errorMessage ? `${name}-error` : undefined}
            />
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

Input.propTypes = {
    type: PropTypes.oneOf(validTypes),
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
};

export default Input;
