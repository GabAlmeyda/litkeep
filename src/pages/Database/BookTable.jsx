import PropTypes from "prop-types";
import { bookShapeType } from "../../utils/propTypes/propTypes";

import styles from "./BookTable.module.css";

function BookTable({ headings, bookArray, dataWidth = "100px" }) {
    if (!/^\d+px$/.test(dataWidth)) {
        console.warn(
            `Invalid measure '${dataWidth}' received in 'BookTable' component. defaulting to '100px'.`
        );
    }

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
                <thead>
                    <tr className={styles.table__headRow}>
                        {headingTitles.map((heading, index) => (
                            <th key={`heading-${keyValues[index]}`}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {bookArray.map((book) => (
                        <tr
                            className={styles.table__bodyRow}
                            key={`row-${book.id}`}
                        >
                            {keyValues.map((key) => (
                                <td
                                    style={dataWidthStyle}
                                    key={`data-${book.id}-${key}`}
                                >
                                    {book[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

BookTable.propTypes = {
    headings: PropTypes.object.isRequired,
    bookArray: PropTypes.arrayOf(PropTypes.shape(bookShapeType)).isRequired,
    dataWidth: PropTypes.string,
};

export default BookTable;
