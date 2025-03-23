import { useState } from "react";

import { genreColorsMap } from "../../utils/constants/books";

import styles from "./BookForm.module.css";

import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import Dropdown from "../../components/form/Dropdown";

function BookForm() {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: Object.keys(genreColorsMap)[0],
        rating: "",
        status: "",
        ownership: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (name, value) => {
        setBookData((prevData) => ({ ...prevData, [name]: value }));
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
                    handleChange(e.target.name, e.target.value)
                }
                name="title"
                value={bookData.title}
            />
            <Input
                type="text"
                placeholder="Nome do autor"
                handleChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                }
                name="author"
                value={bookData.author}
            />
            <Dropdown
                optionsValues={Object.keys(genreColorsMap)}
                handleSelect={(name, option) => handleChange(name, option)}
                name="genre"
                value={bookData.genre}
            />
            <Input
                type="text"
                placeholder="Início da leitura"
                handleChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                }
                name="startDate"
                value={bookData.startDate}
            />
            <Input
                type="text"
                placeholder="Fim da leitura"
                handleChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                }
                name="endDate"
                value={bookData.endDate}
            />
            <Input
                type="text"
                placeholder="Nota"
                handleChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                }
                name="rating"
                value={bookData.rating}
            />
            <Input
                type="text"
                placeholder="Posse do livro"
                handleChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                }
                name="ownership"
                value={bookData.ownership}
            />

            <TextArea
                handleChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                }
                name="description"
                value={bookData.description}
            />
        </form>
    );
}

export default BookForm;
