import PropTypes from "prop-types";

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
 * ### Props:
 * @param {bookShapeType} bookData - The book object.
 * @param {object | Array} dropdownOptions - The options for the 'Dropdown' component.
 * @param {Function} onChange - The function to control the input changes. Receives the
 * name and value of the input as the arguments.
 * @param {Function} onAction - The callback function to handle the buton click. Receives
 * the action of the button, all of them listed bellow:
 * - `"add"`.
 * - `"update"`.
 * - `"remove"`.
 * - `"searchByTitle"`.
 * - `"searchByAuthor"`.
 * - `"clear"`.
 *
 * @returns {JSX.Element} A JSX element representing a form to fill the book data.
 */
function BookForm({ bookData, dropdownOptions, onChange, onAction }) {
    const handleFieldChange = (name, value) => {
        onChange(name, value);
    };

    return (
        <form
            className={styles.form}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onSubmit={(e) => e.preventDefault()}
        >
            <label htmlFor="bookTitle" className={styles.form__titleInput}>
                <Input
                    type="text"
                    placeholder="Nome do livro"
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
                    onClick={() => onAction("searchByTitle")}
                >
                    <IoSearch />
                </button>
            </label>

            <label htmlFor="bookAuthor" className={styles.form__authorInput}>
                <Input
                    type="text"
                    placeholder="Nome do autor"
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
                    onClick={() => onAction("searchByAuthor")}
                >
                    <IoSearch />
                </button>
            </label>
            <Dropdown
                optionsValues={dropdownOptions}
                onSelect={(name, option) => handleFieldChange(name, option)}
                name="genre"
                value={bookData.genre}
            />
            <Input
                type="text"
                placeholder="Início da leitura"
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="startDate"
                value={bookData.startDate}
            />
            <Input
                type="text"
                placeholder="Fim da leitura"
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="endDate"
                value={bookData.endDate}
            />
            <Input
                type="text"
                placeholder="Nota"
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="rating"
                value={bookData.rating}
            />
            <Input
                type="text"
                placeholder="Posse do livro"
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="ownership"
                value={bookData.ownership}
            />

            <TextArea
                onChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="description"
                value={bookData.description}
            />

            <div className={styles.form__buttons}>
                <span className={styles.buttons__left}>
                    <Button
                        bgColor="#2bbad4"
                        fontColor="#fff"
                        onClick={() => onAction("add")}
                    >
                        Adicionar
                    </Button>

                    <Button
                        bgColor="#350a7b"
                        fontColor="#fff"
                        onClick={() => onAction("update")}
                    >
                        Atualizar
                    </Button>
                </span>

                <span className={styles.buttons__right}>
                    <MoreOptions
                        options={moreOptionsMap}
                        onSelect={(dataAction) => onAction(dataAction)}
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
