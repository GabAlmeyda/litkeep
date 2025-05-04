import PropTypes from "prop-types";
import { bookShapeType } from "../../utils/propTypes/propTypes";

import styles from "./BookTable.module.css";

const regex = /^(\d+(\.\d+)?)(px|rem|em|%|vw|vh)$/;

/**
 * Renders a table to display information about the passed books.
 *
 * ### Functions
 *
 * Some avaliable functions are listed below:
 * - double click or 'Enter' on a table row to pass the book information as argument
 * to the 'onDoubleClick' function.
 *
 * ### Props
 *
 * @param {Object} props - The properties of the component.
 * @param {Object} props.headings - The headings of the table. This object should contain
 * the keys that match the keys in the book object shape type.
 * @param {Array<bookShapeType>} props.booksArray - The array of books to be displayed in the table.
 * @param {string} [props.dataWidth="100px"] - The width of the table data cells.
 * @param {Function} props.onDoubleClick - The function to be called when a row is double-clicked
 * or pressed 'Enter'.
 *
 * @returns {JSX.Element} A JSX element representing the table.
 */
function BookTable({
    headings,
    booksArray,
    dataWidth = "100px",
    onDoubleClick,
}) {
    if (!regex.test(dataWidth)) {
        console.warn(
            `Invalid measure '${dataWidth}' received in 'BookTable' component. defaulting to '100px'.`
        );
        dataWidth = "100px";
    }

    const statusMap = {
        read: "Terminado",
        notRead: "Não iniciado",
        reading: "Em andamento",
        abandoned: "Abandonado",
    };
    const normalizedBooksArray = booksArray.map((book) => ({
        ...book,
        _original: book,
        rating: book.rating || (
            <i className={`${styles.table__data} ${styles.notProvided}`}>
                Não informado
            </i>
        ),
        status: statusMap[book.status]
    }));

    const headingTitles = Object.values(headings);
    const keyValues = Object.keys(headings);
    const dataWidthStyle = {
        width: dataWidth,
        minWidth: dataWidth,
        maxWidth: dataWidth,
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead className={styles.table__head}>
                    <tr>
                        {headingTitles.map((heading, index) => (
                            <th key={`heading-${keyValues[index]}`}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className={styles.table__body}>
                    {normalizedBooksArray.map((book) => (
                        <tr
                            className={styles.table__bodyRow}
                            onDoubleClick={() => onDoubleClick(book._original)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onDoubleClick(book);
                                }
                            }}
                            key={`row-${book.id}`}
                        >
                            {keyValues.map((key) => (
                                <td
                                    className={styles.table__data}
                                    style={dataWidthStyle}
                                    key={`data-${book.id}-${key}`}
                                >
                                    {book[key]}
                                </td>
                            ))}
                        </tr>
                    ))}

                    <tr className={styles.table__emptyRow} aria-hidden="true">
                        <td colSpan="100%"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

BookTable.propTypes = {
    headings: PropTypes.object.isRequired,
    booksArray: PropTypes.arrayOf(PropTypes.shape(bookShapeType)).isRequired,
    dataWidth: PropTypes.string,
    onDoubleClick: PropTypes.func,
};

export default BookTable;
