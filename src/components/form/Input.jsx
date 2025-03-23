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
    type: PropTypes.oneOf([
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
    ]).isRequired,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default Input;
