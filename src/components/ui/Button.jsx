import PropTypes from "prop-types";

import styles from "./Button.module.css";

/**
 * Renders a customizable button that accepts a background and font colors
 * as Hexadecimal values. It also triggers a callback when clicked.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} [props.bgColor="#00f"] - The background color of the button. This
 * property should be a valid Hexadecimal value in the format '#AABBCC' or '#ABC'.
 * Default to '#00f' (blue) if not provided or invalid.
 * @param {string} [props.fontColor="#fff"] - The font color of the button. This property
 * should be a valid Hexadecimal value in the format '#AABBCC' or '#ABC' or a valid CSS variable
 * Default to '#fff' (white) if not provided or invalid.
 * @param {func} props.onClick - The function to handle the button's click event.
 * @param {React.ReactNode} props.children - The content inside the button.
 *
 * @returns {JSX.Element} A JSX element representing the custom button.
 */
function Button ({ bgColor = "#00f", fontColor = "#fff", onClick, children }) {
    const regexHex = /^#([0-9A-Fa-f]{3}){1,2}$/;
    const regexVar = /^var\(--[a-zA-Z0-9-_]+\)$/;
    if (!regexHex.test(bgColor) && !regexVar.test(bgColor)) {
        console.warn(
            `The passed background color '${bgColor}' isn't a valid Hexadecimal or CSS variable color for the 'Button' component. Defaulting to '#00f' (blue).`
        );
        bgColor = "#00f";
    }
    if (!regexHex.test(fontColor) && !regexVar.test(fontColor)) {
        console.warn(
            `The passed font color '${fontColor}' isn't a valid Hexadecimal or CSS variable color for the 'Button' component. Defaulting to '#fff' (white).`
        );
        fontColor = "#fff";
    }

    return (
        <button
            className={styles.btn}
            onClick={onClick}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
            style={{ color: fontColor, backgroundColor: bgColor }}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    bgColor: PropTypes.string,
    fontColor: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
