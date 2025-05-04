import { v4 as uuidv4 } from "uuid";

/**
 * A custom hook that handles the book action based on the provided action type.
 *
 * @param {string} action - The action to be performed. Possible values are:
 * - `"add"`: Adding a new book.
 * - `"update"`: Updating an existing book.
 * - `"remove"`: Removing a book.
 * - `"clear"`: cleaning the book data.
 * @param {bookShapeType} bookData - The data to be processed for the action.
 * @param {Object} functions - An object containing all the required functions:
 * @param {function(bookShapeType): void} functions.addBook - Function to add a new book.
 * @param {function(bookShapeType): void} functions.updateBook - Function to update a registered book.
 * @param {function(string): void} functions.removeBook - Function to remove a registered book.
 * @param {function(): void} functions.clearBookData - Function to clear all the input fields.
 *
 * @throws {Error} If the action type is invalid.
 */
export function handleBookAction(action, bookData, functions) {
    const { addBook, updateBook, removeBook, clearBookData } = functions;

    switch (action) {
        case "add":
            addBook(bookData);
            clearBookData();
            break;
        case "update":
            updateBook(bookData);
            clearBookData();
            break;
        case "remove":
            removeBook(bookData.id);
            clearBookData();
            break;
        case "clear":
            clearBookData();
            break;
        default:
            throw new Error(
                `Invalid action type: ${action}. Valid actions are: add, update, remove, clear.`
            );
    }
}

/**
 * Validates the book data based on the action being performed.
 *
 * @param {bookShapeType} bookData - The data to be validate.
 * @param {string} action - The action being performed. Possible values to be
 * validated are:
 * - "add": Adding a new book.
 * - "update": Updating an existing book.
 * - "remove": Removing a book.
 * - "searchByTitle": Searching for a book by title.
 * - "searchByAuthor": Searching for a book by author.
 * @param {Array<string>} bookIdsArray - An array containing all the registered book ids.
 *
 * @returns {object} An object containing any validation errors found. The keys of the
 * object correspond to the fields that have errors, and the values are the error messages.
 * The `err` key indicates whether there are any errors (true) or not (false).
 */
export function validateBookData(bookData, action, bookIdsArray) {
    const errors = {};

    const validOwnershipValues = ["sim", "não"];
    const validStringRatingValues = ["abandonado", ""];
    const [startDay, startMonth, startYear] = bookData.startDate
        .split("/")
        .map(Number);
    const [endDay, endMonth, endYear] = bookData.endDate.split("/").map(Number);
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    // Verifies if the fields are correctly provided based on the action
    switch (action) {
        case "clear":
            return { ...errors, err: false };

        case "viewBook":
            if (!bookData.id) {
                errors.id = "Livro não selecionado.";
            }

            return { ...errors, err: Object.keys(errors).length > 0 };

        case "add":
            if (new Set(bookIdsArray).has(bookData.id)) {
                errors.id = "Livro selecionado.";

                // early return
                return { ...errors, err: true };
            }
            if (!bookData.title) {
                errors.title = "Título obrigatório.";
            }
            if (!bookData.author) {
                errors.author = "Autor obrigatório.";
            }
            break;

        case "update":
            if (!bookData.id) {
                errors.id = "Livro não selecionado.";

                // early return
                return { ...errors, err: true };
            }
            if (!bookData.title) {
                errors.title = "Título obrigatório.";
            }
            if (!bookData.author) {
                errors.author = "Autor obrigatório.";
            }
            break;

        case "remove":
            if (!bookData.id) {
                errors.id = "Livro não selecionado.";
            }
            
            return { ...errors, err: Object.keys(errors).length > 0 };

        case "searchByTitle":
            if (!bookData.title) {
                errors.title = "Título obrigatório.";
            }

            // early return
            return { ...errors, err: Object.keys(errors).length > 0 };

        case "searchByAuthor":
            if (!bookData.author) {
                errors.author = "Autor obrigatório.";
            }

            // early return
            return { ...errors, err: Object.keys(errors).length > 0 };
    }

    // Verifies if the ownership is correctly provided
    if (
        !validOwnershipValues.includes(
            new String(bookData.ownership).toLowerCase()
        )
    ) {
        errors.ownership = "Propriedade deve ser 'Sim' ou 'Não'";
    }

    // Verifies if the start and end dates are correctly provided
    if (bookData.startDate && isNaN(startDate.getTime())) {
        errors.startDate = "Data inválida.";
    }
    if (bookData.endDate && isNaN(endDate.getTime())) {
        errors.endDate = "Data inválida.";
    }
    if (!bookData.startDate && bookData.endDate) {
        errors.startDate =
            "Data de início obrigatória se a data de término for preenchida.";
    }
    if (bookData.startDate && bookData.endDate) {
        if (startDate > endDate) {
            errors.startDate =
                "Data de início deve ser anterior à data de término.";
        }
    }
    if (
        bookData.rating &&
        bookData.rating.trim().toLowerCase() !== "abandonado" &&
        typeof Number(bookData.rating) === "number" &&
        !bookData.endDate
    ) {
        errors.endDate =
            "O livro não pode ter avaliação sem a data de término.";
    }

    // Verifies if the rating is correctly provided
    if (
        !validStringRatingValues.includes(
            new String(bookData.rating).toLowerCase()
        ) &&
        typeof Number(bookData.rating) !== "number" &&
        isNaN(Number(bookData.rating))
    ) {
        errors.rating =
            "Avaliação deve ser um número, 'Abandonado' ou vazio ('') para um livro não lido.";
    }
    if (
        bookData.startDate &&
        bookData.endDate &&
        typeof Number(bookData.rating) !== "number"
    ) {
        if (bookData.rating.trim().toLowerCase() === "abandonado")
            errors.rating =
                "Livros já lidos não podem ter avaliação como 'abandonado'";
    }

    return { ...errors, err: Object.keys(errors).length > 0 };
}

/**
 * Normalizes the book data to ensure consistent formatting and structure.
 *
 * @param {bookShapeType} bookData - The data to be normalized.
 *
 * @returns {bookShapeType} The normalized book data.
 */
export function normalizeBookData(bookData) {
    const validRatings = ["abandoned", ""];

    const normalizedBookData = {
        ...bookData,
        id: uuidv4(),
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        genre: bookData.genre.trim(),
        startDate: bookData.startDate.trim(),
        endDate: bookData.endDate.trim(),
        description: bookData.description.trim(),
        ownership:
            bookData.ownership.trim().charAt(0).toUpperCase() +
            bookData.ownership.slice(1).toLowerCase(),
    };

    // Normalize the rating to a number or a string based on the valid ratings
    if (bookData.rating && validRatings.includes(bookData.rating)) {
        normalizedBookData.rating =
            normalizedBookData.rating.trim().charAt(0).toUpperCase() +
            normalizedBookData.rating.slice(1).toLowerCase();
    } else if (!isNaN(parseFloat(bookData.rating))) {
        normalizedBookData.rating = parseFloat(bookData.rating).toFixed(1);
    }

    // Normalize the status based on the start date, end date and rating
    if (bookData.rating === "abandonado") {
        normalizedBookData.status = "abandoned";
    } else if (bookData.startDate && bookData.endDate) {
        normalizedBookData.status = "read";
    } else if (bookData.startDate) {
        normalizedBookData.status = "reading";
    } else {
        normalizedBookData.status = "notRead";
    }

    return normalizedBookData;
}
