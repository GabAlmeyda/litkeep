import styles from "./Navbar.module.css";

import useTheme from "../../utils/useTheme";

import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar({ withLogo = true }) {
    const [theme, toggleTheme] = useTheme();

    return (
        <nav className={styles.navbar}>
            {withLogo && (
                <a href="/" aria-label="Ir para a página principal">
                    <img src="/litkeep.jpg" alt="LitKeep" />
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
