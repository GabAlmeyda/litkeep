import PropTypes from "prop-types";
import styles from "./Header.module.css";

import Navbar from "./Navbar";
import clsx from "clsx";

/**
 * Renders a customizable header element.
 *
 * @param {Object} props - The properties to be passed to the component.
 * @param {boolean} [props.hideLogo] - If present, the 'Navbar' component will not
 * display the site's logo;
 * @param {string} [props.customClass] - Optional custom class for styling.
 * @param {React.ReactNode} [props.children] - Optional content to be rendered inside the header.
 * If no content is passed, the header will only contain the 'Navbar' component.
 *
 * @returns {JSX.Element} A JSX element representing the header component.
 */
function Header({ hideLogo, customClass, children }) {
    return (
        <header className={clsx(styles.header, customClass)}>
            <Navbar hideLogo={hideLogo} />

            {children}
        </header>
    );
}

Header.propTypes = {
    hideLogo: PropTypes.bool,
    customClass: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
    children: PropTypes.node,
};

export default Header;
