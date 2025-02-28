import { getWebsitePaths } from "../../utils/contants/paths";

import styles from "./Navbar.module.css";

import useTheme from "../../utils/hooks/useTheme";

import { MdDarkMode, MdLightMode } from "react-icons/md";

/**
 * Renders a nav element.
 * 
 * This component represents a nav that contains the button for toggle the mode
 * and the site's logo. The logo can be hide if the **'withoutLogo'** prop is 
 * present.
 * 
 * @param {boolean} [withoutLogo] - Hides the site's logo if provided. 
 * 
 * @returns {JSX.Element} The rendered nav element.
 */
function Navbar({ withoutLogo }) {
    const [theme, toggleTheme] = useTheme();
    const websitePaths = getWebsitePaths();

    return (
        <nav className={styles.navbar}>
            {!withoutLogo && (
                <a href={websitePaths.homepage} aria-label="Ir para a página principal">
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

export default Navbar;
