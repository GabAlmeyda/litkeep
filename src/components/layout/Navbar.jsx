import PropTypes from "prop-types";

import useTheme from "../../utils/hooks/useTheme";

import styles from "./Navbar.module.css";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/**
 * Renders a nav element.
 *
 * This component represents a nav that contains the button for toggle the mode
 * and the site's logo. The logo can be hide if the **'withoutLogo'** prop is
 * present.
 *
 * @param {Object} props - The properties to be passed to the component.
 * @param {boolean} [props.hideLogo] - Hides the site's logo if provided.
 *
 * @returns {JSX.Element} A JSX element representing the nav component.
 */
function Navbar({ hideLogo = false }) {
    const [theme, toggleTheme] = useTheme();
    const navigate = useNavigate();

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <nav className={styles.navbar}>
            {!hideLogo && (
                <a
                    href="#"
                    onClick={handleLogoClick}
                    aria-label="Ir para a página principal"
                >
                    <img src="/litkeep.png" alt="LitKeep" />
                </a>
            )}

            <button
                aria-label="Trocar entre tema claro e escuro"
                onClick={toggleTheme}
            >
                {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
            </button>
        </nav>
    );
}

Navbar.propTypes = {
    hideLogo: PropTypes.bool,
};

export default Navbar;
