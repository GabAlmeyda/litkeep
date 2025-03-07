import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                <small>
                    LitKeep &copy; Todos os direitos reservados. Site feito por{" "}
                    <a
                        href="https://www.instagram.com/almeyda.dev/"
                        target="_blank"
                    >
                        Gabriel Almeyda
                    </a>
                </small>
            </p>
        </footer>
    );
}

export default Footer;
