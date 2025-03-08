import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./InfoCard.module.css";

/**
 * Renders a customizable information card, where the content is passed as a children to the component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {"left" | "center" | "right"} [props.alignment="left"] - Defines the horizontal text alignment.
 * @param {string} [props.customClasses=""] - Space-separated list of custom CSS class names to be applied.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 *
 * @returns {React.JSX.Element} A customizable information card.
 */
function InfoCard({ alignment = "left", customClasses = "", children }) {
    const validAlignment = ["left", "center", "right"];

    if (!validAlignment.includes(alignment)) {
        console.warn(
            `'${alignment}' is an invalid align type for the 'InfoCard' component. Defaulting to 'left'.`
        );
        alignment = "left";
    }

    return (
        <div
            className={clsx(
                styles.infoCard,
                ...customClasses.split(" ").map((cls) => styles[cls])
            )}
            style={{ textAlign: alignment }}
        >
            {children}
        </div>
    );
}

InfoCard.propTypes = {
    alignment: PropTypes.oneOf(["left", "center", "right"]),
    customClasses: PropTypes.string,
    children: PropTypes.node,
};

export default InfoCard;
