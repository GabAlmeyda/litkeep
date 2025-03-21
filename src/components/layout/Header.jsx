import PropTypes from "prop-types";
import styles from "./Header.module.css";

import Navbar from "./Navbar";

/**
 * Renders a customizable header element.
 *
 * @param {Object} props - The properties to be passed to the component.
 * @param {boolean} [props.navWithoutLogo] - If present, the 'Navbar' component will not
 * display the site's logo;
 * @param {string} [props.customClass] - Optional custom class for styling.
 * @param {React.ReactNode} [props.children] - Optional content to be rendered inside the header.
 * If no content is passed, the header will only contain the 'Navbar' component.
 *
 * @returns {JSX.Element} A JSX element representing the header component.
 */
function Header({ navWithoutLogo, customClass, children }) {
    return (
        <header className={`${styles.header} ${customClass}`}>
            <Navbar withoutLogo={navWithoutLogo} />

            {children}
        </header>
    );
}

Header.propTypes = {
    navWithoutLogo: PropTypes.bool,
    customClass: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
    children: PropTypes.node,
};

export default Header;
