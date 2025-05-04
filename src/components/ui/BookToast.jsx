import PropTypes from "prop-types";

import styles from "./BookToast.module.css";

import { IoWarning } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import ErrorFallback from "./ErrorFallback";

/**
 * Renders a toast message component, giving a feedback to the user about a
 * book-related action. The toast automatically disappears after 3 seconds or
 * can be manually dismissed by clicking on it.
 *
 * @param {Object} props - The properties of the component.
 * @param {"add" | "remove" | "update"} props.action - The action being made.
 * @param {"loading" | "success" | "error" | "notFound"} props.status - The status of the action.
 *
 * @returns {JSX.Element} a JSX element representing a toast message notification for
 * a book action.
 */
function BookToast({ action, status }) {
    const [showBookToast, setShowBookToast] = useState(true);
    const errorRef = useRef(false);
    // Removes the toast after 3 seconds
    useEffect(() => {
        const closeToast = () => {
            setShowBookToast(false);
        };

        const timeOutId = setTimeout(closeToast, 3000);

        return () => clearTimeout(timeOutId);
    }, []);

    const actionStatusMap = {
        add: {
            loading: "Adicionando Livro...",
            success: "Livro Adicionado!",
            error: "Erro ao adicionar livro.",
            alreadyRegistered:
                "remova a seleção atual para cadastrar outro livro.",
        },
        update: {
            loading: "Atualizando Livro...",
            success: "Livro Atualizado!",
            error: "Erro ao atualizar livro.",
            notFound: "Selecione um livro para atualizar.",
        },
        remove: {
            loading: "Removendo Livro...",
            success: "Livro Removido!",
            error: "Erro ao remover livro.",
            notFound: "Selecione um livro para remover.",
        },
        viewBook: {
            notFound: "Selecione um livro para visualizar.",
        }
    };
    if (!Object.keys(actionStatusMap).includes(action)) {
        console.error(
            `Invalid action '${action}' received in 'BookToast' component. Expect one of "add", "remove", "update" or "viewBook".`
        );
        errorRef.current = true;
    }

    let backgroundColor = undefined;
    switch (status) {
        case "loading":
            backgroundColor = "#f59405";
            break;
        case "success":
            backgroundColor = "#02b01f";
            break;
        case "error":
        case "notFound":
        case "alreadyRegistered":
            backgroundColor = "#c90202";
            break;
        default:
            console.error(
                `Invalid status '${status}' received in 'BookToast' component. Expect one of "loading", "success", "error", "notFound" or "alreadyRegistered".`
            );
            errorRef.current = true;
    }

    if (errorRef.current) return <ErrorFallback componentName="BookToast" />

    const handleClick = (e) => {
        if (e.currentTarget.className === styles.toast) {
            setShowBookToast(false);
        }
    };

    return (
        showBookToast && (
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
        )
    );
}

BookToast.propTypes = {
    action: PropTypes.oneOf(["add", "update", "remove"]).isRequired,
    status: PropTypes.oneOf(["loading", "success", "error", "notFound"])
        .isRequired,
};

export default BookToast;
