import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./LinkButton.module.css";
import PropTypes from "prop-types";

/**
 * renders a customizable link button.
 *
 * @param {Object} props - The properties to be passed to the component.
 * @param {string} [props.label="PLACEHOLDER"] - The visible text of the button;
 * @param {string} [props.to="#"] - The path where the button will navigate the user;
 * @param {"accent" | "surface"} [props.color="accent"] - The two avaliable color options.
 * @param {string} [props.customClasses] - The custom classes natively provided by
 * 'LinkButtton'component. All of them are listed bellow:
 *  - **onlyStroke:** If provided, the button background will be transparent and
 * the stroke will reveive the specified color. Defaults to 'true' if present;
 *  - **bigger:** If provided, the button's size will be bigger.
 *
 * @returns {JSX.Element} The rendered link button for navigation.
 */
function LinkButton({
    label = "PLACEHOLDER",
    to = "#",
    color = "accent",
    customClasses = "",
}) {
    const validColors = ["accent", "surface"];
    if (!validColors.includes(color)) {
        console.warn(
            `The color '${color}' is invalid for the 'LinkButton' component. Defaulting to 'accent'.`
        );
        color = "accent";
    }

    return (
        <Link to={to} className={styles.linkContainer}>
            <button
                className={clsx(
                    styles.button,
                    styles[color],
                    customClasses &&
                        customClasses.split(" ").map((cls) => styles[cls])
                )}
            >
                {label}
            </button>
        </Link>
    );
}

LinkButton.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    color: PropTypes.oneOf(["accent", "surface"]),
    customClasses: PropTypes.string,
};

export default LinkButton;
