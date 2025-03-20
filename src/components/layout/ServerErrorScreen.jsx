import styles from "./ServerErrorScreen.module.css";

import { IoWarningOutline } from "react-icons/io5";

/**
 * Renders a full-page component showing to the user a 
 * message when an error was ocurried in the server (error 500).
 * 
 * @returns {JSX.Element} A JSX element representing a full-page internal server error.
 */
function ServerErrorScreen() {
    return (
        <main className={styles.erroWrapper}>
            <section
                role="alert"
                aria-live="assertive"
                aria-describedby="error-desc"
                className={styles.error}
            >
                <span className={styles.error__warning} aria-label="Ícone de aviso">
                    <IoWarningOutline />
                </span>
                <h2 id="error-type">Erro 500</h2>
                <h3 id="error-desc">Erro Interno do Servidor</h3>
    
                <p>
                    Houve um erro no banco de dados. Por favor, tente novamente.
                </p>
            </section>
        </main>
    );
}

export default ServerErrorScreen;
