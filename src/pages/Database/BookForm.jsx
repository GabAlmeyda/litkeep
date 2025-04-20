import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { bookShapeType } from "../../utils/propTypes/propTypes";

import styles from "./BookForm.module.css";

import { IoSearch } from "react-icons/io5";

import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import Dropdown from "../../components/form/Dropdown";
import Button from "../../components/ui/Button";
import MoreOptions from "../../components/ui/MoreOptions";

const moreOptionsMap = {
    clear: "Limpar tudo",
    remove: "Remover livro",
};

/**
 * Renders a form element to fill the book data. All the inputs and buttons
 * utilities are described bellow:
 *
 * ### Inputs fields:
 * - Book's title (`text`).
 * - Book's author (`text`).
 * - Book's genre (the 'Dropdown' component, returning a `<dropdown>` element).
 * - Book's start reading date (`text`).
 * - Book's end reading date (`text`).
 * - Book's rating (`float` | `"abandonado"` | empty string `""`).
 * - User onwershipes of the book (`"sim"`, `"não"`).
 * - Book's description (The 'Textarea' component, returning a `<textarea>` element).
 *
 * ### Buttons:
 * - **Adicionar**: Adds a new book, triggering the `"add"` action.
 * - **Atualizar**: Updates a registered book, triggering the `"update"` action.
 * - **Remover livro**: Removes a registered book, trigering the `"remove"` action.
 * - **Pesquisar**: Searches a book, or by the 'book's title' input, triggering the `"searchByTitle"`
 * action, or by the 'book's author' input, triggering the `"searchByAuthor"` action.
 * - **Limpar tudo**: Clears all the input fields, triggering the `"clear"` action.
 *
 * ### Validations:
 * - The book's title and ownership are required fields for the `"add"` and `"update"` actions.
 * - The book's title is a required field for the `"searchByTitle"` action.
 * - The book's author is a required field for the `"searchByAuthor"` action.
 *
 * If any of the required fields are not filled, an error message will be displayed, and the
 * `onAction` function will be called with the errors as `true`. Otherwise, the `onAction` function
 * will be called with `false` as the errors.
 *
 * ### Props:
 * @param {bookShapeType} bookData - The book object.
 * @param {Object | Array} dropdownOptions - The options for the `Dropdown` component.
 * @param {Function} onChange - The function to control the input changes. Receives the
 * name and value of the input as the arguments.
 * @param {Function} onAction - The callback function to handle a button click. Receives
 * the action of the button (`string`) and the errors (`object`), containing all the errors 
 * messages and a `err` key. If there are no errors, the `err` key will be `false`. Otherwise,
 * it will be `true`.
 * #### Avaliable actions:
 * - `"add"`.
 * - `"update"`.
 * - `"remove"`.
 * - `"searchByTitle"`.
 * - `"searchByAuthor"`.
 * - `"clear"`.
 *
 * @returns {JSX.Element} A JSX element representing a form to fill the book data.
 */
function BookForm ({ bookData, dropdownOptions, onChange, onAction }) {
    // State to manage the errors of the input fields.
    const [errors, setErrors] = useState({});
    const searchInputRef = useRef(null);

    // Sets the height of the search buttons to match the height of the input field.
    useEffect(() => {
        const searchButtonsArray = document.querySelectorAll(
            `.${styles.searchButton}`
        );

        const handleResize = () => {
            if (searchInputRef.current) {
                const { height } =
                    searchInputRef.current.getBoundingClientRect();
                searchButtonsArray.forEach((button) => {
                    button.style.height = `${height}px`;
                });
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Validates the input fields and sets the error's key/value pair if any field is invalid.
    const handleAction = (action) => {
        const errorsObject = {};

        switch (action) {
            case "add":
                if (!bookData.title) {
                    errorsObject.title = "Título obrigatório.";
                }
                if (!bookData.ownership) {
                    errorsObject.ownership = "Posse obrigatória.";
                }
                break;

            case "update":
                if (!bookData.title) {
                    errorsObject.title = "Título obrigatório.";
                }
                if (!bookData.ownership) {
                    errorsObject.ownership = "Posse obrigatória.";
                }
                if (!bookData.id) {
                    errorsObject.id = "ID do livro obrigatório.";
                }
                break;

            case "remove":
                if (!bookData.id) {
                    errorsObject.id = "ID do livro obrigatório.";
                }
                break;

            case "searchByTitle":
                if (!bookData.title) {
                    errorsObject.title = "Título obrigatório para a busca.";
                }
                break;

            case "searchByAuthor":
                if (!bookData.author) {
                    errorsObject.author = "Autor obrigatório para a busca.";
                }
                break;
        }

        const containsErrors = Object.keys(errorsObject).length > 0;

        setErrors({ ...errorsObject });
        onAction(action, {err: containsErrors, ...errorsObject});
    };

    const handleFieldChange = (name, value) => {
        setErrors({});
        onChange(name, value);
    };

    return (
        <form
            className={styles.form}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onSubmit={(e) => e.preventDefault()}
        >
            <div className={styles.form__searchInput} ref={searchInputRef}>
                <Input
                    type="text"
                    placeholder="Nome do livro"
                    errorMessage={errors.title}
                    onChange={(e) =>
                        handleFieldChange(e.target.name, e.target.value)
                    }
                    name="title"
                    value={bookData.title}
                    id="bookTitle"
                />
                <button
                    className={styles.searchButton}
                    aria-label="Pesquisar livro pelo nome"
                    type="button"
                    onClick={() => handleAction("searchByTitle")}
                >
                    <IoSearch />
                </button>
            </div>

            <div className={styles.form__searchInput}>
                <Input
                    type="text"
                    placeholder="Nome do autor"
                    errorMessage={errors.author}
                    onChange={(e) =>
                        handleFieldChange(e.target.name, e.target.value)
                    }
                    name="author"
                    value={bookData.author}
                    id="bookAuthor"
                />

                <button
                    className={styles.searchButton}
                    aria-label="Pesquisar livro pelo autor"
                    type="button"
                    onClick={() => handleAction("searchByAuthor")}
                >
                    <IoSearch />
                </button>
            </div>
            <Dropdown
                optionsValues={dropdownOptions}
                onSelect={(name, option) => handleFieldChange(name, option)}
                name="genre"
                value={bookData.genre}
                id="bookGenre"
            />
            <Input
                type="text"
                placeholder="Início da leitura"
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="startDate"
                value={bookData.startDate}
                id="bookStartDate"
            />
            <Input
                type="text"
                placeholder="Fim da leitura"
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="endDate"
                value={bookData.endDate}
                id="bookEndDate"
            />
            <Input
                type="text"
                placeholder="Nota"
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="rating"
                value={bookData.rating}
                id="bookRating"
            />
            <Input
                type="text"
                placeholder="Posse do livro"
                errorMessage={errors.ownership}
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="ownership"
                value={bookData.ownership}
                id="bookOwnership"
            />

            <TextArea
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="description"
                value={bookData.description}
                id="bookDescription"
            />

            <div className={styles.form__buttons}>
                <span className={styles.buttons__left}>
                    <Button
                        bgColor="#2bbad4"
                        fontColor="#fff"
                        onClick={() => handleAction("add")}
                    >
                        Adicionar
                    </Button>

                    <Button
                        bgColor="#350a7b"
                        fontColor="#fff"
                        onClick={() => handleAction("update")}
                    >
                        Atualizar
                    </Button>
                </span>

                <span className={styles.buttons__right}>
                    <MoreOptions
                        options={moreOptionsMap}
                        onSelect={(dataAction) => handleAction(dataAction)}
                    />
                </span>
            </div>
        </form>
    );
}

BookForm.propTypes = {
    bookData: PropTypes.shape(bookShapeType).isRequired,
    dropdownOptions: PropTypes.oneOf([PropTypes.array, PropTypes.object])
        .isRequired,
    onChange: PropTypes.func.isRequired,
    onAction: PropTypes.func.isRequired,
};

export default BookForm;
