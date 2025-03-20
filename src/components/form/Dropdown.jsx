import PropTypes from "prop-types";
import styles from "./DropDown.module.css";
import { useState } from "react";

/**
 * Renders a custom dropdown list with the provided options.
 *
 * @param {object} props - The properties of the component.
 * @param {object.<string, string>} props.optionsValues - An object where the keys representing the
 * data values and the values are the visible text.
 *
 * @example
 * const dropdownOptions = {
 *     math: "Math lessons",
 *     port: "Portuguese lessons",
 *     english: "English lessons",
 *
 * }
 *
 * <Dropdown
 *     label="Please select:"
 *     optionsValues={dropdownOptions}
 * />
 *
 * @returns {JSX.Element} A JSX element representing the dropdown component.
 */
function Dropdown({ optionsValues }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(Object.values(optionsValues)[0]);

    const options = Object.values(optionsValues);
    const dataValues = Object.keys(optionsValues);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (!isOpen) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const option = e.target.textContent;
            handleSelect(option);
        }
        else if (e.key === "Escape") setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdown__visibleContent}>
                <span>Tipo: | </span>
                <button
                    onClick={toggleDropdown}
                    id="dropdown__button"
                    aria-expanded={isOpen}
                    aria-activedescendant={
                        isOpen
                            ? `dropdown-option-${options.indexOf(selected)}`
                            : undefined
                    }
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-controls="dropdown__menu"
                    tabIndex={0}
                >
                    <span
                        className={styles.visibleContent__label}
                    >
                        {selected}
                    </span>
                    <span className={styles.visibleContent__icon}></span>
                </button>
            </div>

            <ul
                style={{display: isOpen ? "inline-block" : "none"}}
                className={styles.dropdown__content}
                id="dropdown__menu"
                role="listbox"
                aria-labelledby="dropdown__button"
            >
                {options.map((opt, index) => (
                    <li
                        onClick={() => handleSelect(opt)}
                        onKeyDown={handleKeyDown}
                        data-value={dataValues[index]}
                        id={`dropdown-option-${index}`}
                        className={styles.dropdown__option}
                        key={index}
                        role="option"
                        aria-selected={selected === opt}
                        tabIndex={0}
                    >
                        {opt}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Dropdown.propTypes = {
    optionsValues: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Dropdown;
