import PropTypes from "prop-types";

import { bookShapeType } from "../../utils/propTypes/propTypes";

import styles from "./BookForm.module.css";

import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import Dropdown from "../../components/form/Dropdown";

function BookForm({ bookData, dropdownOptions, handleChange, handleSubmit }) {
    const handleFieldChange = (name, value) => {
        handleChange(name, value);
    };

    return (
        <form
            className={styles.form}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
            <Input
                type="text"
                placeholder="Nome do livro"
                handleChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="title"
                value={bookData.title}
            />
            <Input
                type="text"
                placeholder="Nome do autor"
                handleChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="author"
                value={bookData.author}
            />
            <Dropdown
                optionsValues={dropdownOptions}
                handleSelect={(name, option) => handleFieldChange(name, option)}
                name="genre"
                value={bookData.genre}
            />
            <Input
                type="text"
                placeholder="Início da leitura"
                handleChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="startDate"
                value={bookData.startDate}
            />
            <Input
                type="text"
                placeholder="Fim da leitura"
                handleChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="endDate"
                value={bookData.endDate}
            />
            <Input
                type="text"
                placeholder="Nota"
                handleChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="rating"
                value={bookData.rating}
            />
            <Input
                type="text"
                placeholder="Posse do livro"
                handleChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="ownership"
                value={bookData.ownership}
            />

            <TextArea
                handleChange={(e) =>
                    handleFieldChange(e.target.name, e.target.value)
                }
                name="description"
                value={bookData.description}
            />
        </form>
    );
}

BookForm.propTypes = {
    bookData: PropTypes.shape(bookShapeType).isRequired,
    dropdownOptions: PropTypes.oneOf([PropTypes.array, PropTypes.object])
        .isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default BookForm;
