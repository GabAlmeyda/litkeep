import PropTypes from "prop-types";

import styles from "./ErrorFallback.module.css";

import { IoWarning } from "react-icons/io5";

/**
 * Renders a fallback layout when an error occurs in a specific component,
 * failing to be displayed.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.componentName - The name of the component where the error
 * occurred.
 *
 * @returns {JSX.Element} A JSX element representing the error fallback component.
 */
function ErrorFallback({ componentName }) {
    return (
        <div className={styles.error}>
            <IoWarning className={styles.error__icon} />
            <p className={styles.error__message}>
                Error in {`'${componentName}'`}
            </p>
        </div>
    );
}

ErrorFallback.propTypes = {
    componentName: PropTypes.string.isRequired,
};

export default ErrorFallback;
