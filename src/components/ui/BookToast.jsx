import PropTypes from "prop-types";

import styles from "./BookToast.module.css";

import { IoWarning } from "react-icons/io5";
import { useEffect } from "react";

/**
 * Renders a toast message component, giving a feedback to the user about a 
 * book-related action. The toast automatically disappears after 3 seconds or 
 * can be manually dismissed by clicking on it.
 * 
 * @param {object} props - The properties of the component.
 * @param {"add" | "remove" | "update"} props.action - The action being made.
 * @param {"loading" | "finished" | "error"} props.status - The status of the action.
 *  
 * @returns {JSX.Element} a JSX element representing a toast message notification for 
 * a book action.
 */
function BookToast ({ action, status }) {

    // Removes the toast after 3 seconds
    useEffect(() => {
        const closeToast = () => {
            const toast = document.querySelector(`.${styles.toast}`);
            if (toast) toast.remove();
        };

        const timeOutId = setTimeout(closeToast, 3000);

        return () => clearTimeout(timeOutId);
    }, []);

    const actionStatusMap = {
        add: {
            loading: "Adicionando Livro...",
            finished: "Livro Adicionado!",
            error: "Erro ao adicionar livro!",
        },
        update: {
            loading: "Atualizando Livro...",
            finished: "Livro Atualizado!",
            error: "Erro ao atualizar livro!",
        },
        delete: {
            loading: "Removendo Livro...",
            finished: "Livro Removido!",
            error: "Erro ao remover livro!",
        },
    };

    let backgroundColor = undefined;
    switch (status) {
        case "loading":
            backgroundColor = "#f59405";
            break;
        case "finished":
            backgroundColor = "#02b01f";
            break;
        case "error":
            backgroundColor = "#c90202";
            break;
    }

    const handleClick = (e) => {
        if (e.currentTarget.className === styles.toast) {
            e.currentTarget.remove();
        }
    };

    return (
        <div
            className={styles.toast}
            style={{ backgroundColor: backgroundColor }}
            onClick={handleClick}
        >
            {status === "error" && (
                <IoWarning className={styles.toast__warning} />
            )}

            <p className={styles.toast__message}>
                {actionStatusMap[action][status]}
            </p>
        </div>
    );
}

BookToast.propTypes = {
    action: PropTypes.oneOf(["add", "update", "delete"]).isRequired,
    status: PropTypes.oneOf(["loading", "finished", "error"]).isRequired,
};

export default BookToast;
