import PropTypes from "prop-types";

import { genreColorsMap } from "../constants/books";

/**
 * PropTypes shape for a book object.
 * 
 * Defines the expected structure of a book object, ensuring that the
 * components using book data adhere to a consistent format.
 * 
 * Each book object should contain the following properties:
 * 
 * - **id** (`string`): A unique identifier for the book.
 * - **title** (`string`): The title of the book.
 * - **author** (`string`): The author of the book.
 * - **genre** (`string`): The literary genre of the book. Must be one of the keys 
 * defined in the 'genreColorsMap' object.
 * - **rating** (`string | number`): The rating of the book. It can be:
 *  - A float number.
 *  - The string `"abandoned"` if the book was abandoned.
 *  - An empty string `""` if the book was not read.
 * - **status** (`string`): The reading status. The possible values are:
 *  - `"reading"` if the book is currently being read.
 *  - `"notRead"` if the book has not been started.
 *  - `"read"` if the book has been finished.
 *  - `"abandoned"` if the book was abandoned.
 * - **ownership** (`boolean`): Indicates if the user owns the book (`true` for owned, 
 * `false` otherwise).
 * - **startDate** (`string`): The date when reading started, in the format DD/MM/AAAA 
 * or a empty string if not started.
 * - **endDate** (`string`): The date when reading finished, in the format DD/MM/AAAA
 * or a empty string if not finished.
 * - **descripton** (`string`): The user's description of the book.
 */
export const bookShapeType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(Object.keys(genreColorsMap)).isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string.isRequired,
    ownership: PropTypes.bool.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
});
