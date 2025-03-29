import PropTypes from "prop-types";
import styles from "./Input.module.css";

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
 * @param {object} props - The properties of the component.
 * @param {string} props.type - The input type. This component accepts the following types:
 * - "text", "password", "email", "url", "number", "tel", "search", 
 * - "date", "month", "week", "time", "datetime-local".
 * If no type is provided, the default type is "text".
 * @param {string} [props.placeholder="digite aqui"] - The placeholder text inside of the input. 
 * If no placeholder is provided, the default placeholder is "digite aqui".
 * @param {Function} props.handleChange - The function to control the input changes, 
 * passed to the 'onChange' attribute'. It receives a event as an argument.
 * @param {string} props.name - The name attribute of the input, to manage forms data.
 * @param {any} props.value - The value of the input field, controlled by the parent 
 * component. This should match the type of input.
 * 
 * @example
 * const [inputValue, setInputValue] = useState("");
 * const handleInputChange = (e) => setInputChange(e.target.value);
 * 
 * <Input 
 *   type="email" 
 *   placeholder="Digite seu email"
 *   handleChange={handleInputChange} 
 *   name="email" 
 *   value={inputValue}
 * />
 *  
 * @returns {JSX.Element} A JSX element representing the input field.
 */
function Input({
    type = "text",
    placeholder = "Digite aqui",
    handleChange,
    name,
    value,
}) {
    if (!validTypes.includes(type)) {
        console.warn(
            `Invalid type '${type}' received in 'Input' component. Defauting to 'text'.`
        );
        type = "text";
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            className={styles.input}
            name={name}
            value={value}
            autoComplete="off"
        />
    );
}

Input.propTypes = {
    type: PropTypes.oneOf(validTypes),
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};

export default Input;
