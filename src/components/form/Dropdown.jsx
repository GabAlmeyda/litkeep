import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import styles from "./Dropdown.module.css";

import ErrorFallback from "../ui/ErrorFallback";

/**
 * Renders a custom dropdown list with the provided options. This component calls a callback
 * function when clicking in one option, passing the selected option's value as the argument.
 *
 * @param {object} props - The properties of the component.
 * @param {object.<string, string>} props.optionsValues - An object where the keys representing the
 * data values and the values are the visible text. If an array is passed, the data values are equal
 * to the displayed options.
 * @param {Function} props.handleSelect - The callback function to handle the selection of one option.
 * This function is called passing the name and the data-value as the argument.
 * @param {string} props.name - The name attribute for the input, to manage forms data.
 * @param {String} [props.value] - The value of the selected option. If not passed (or a falsy value), the
 * first option is setted by default.
 *
 * @example
 * const [selectedLesson, setSelectedLesson] = useState("");
 *
 * const dropdownOptions = {
 *     math: "Math lessons",
 *     port: "Portuguese lessons",
 *     english: "English lessons",
 * };
 *
 * const handleSelectOption = (name, option) => {
 *     console.log(`name: ${name}, option: ${option}`);
 *     setSelectedLesson(option);
 * };
 *
 * <Dropdown
 *     optionsValues={dropdownOptions}
 *     handleSelect={handleSelectOption}
 *     name="lesson"
 *     value={selectedLesson}
 * />
 *
 * @returns {JSX.Element} A JSX element representing the dropdown component.
 */
function Dropdown({ optionsValues, handleSelect, name, value }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(value);
    const dropdownRef = useRef(null);

    // handles the click outside to close de dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // verifies if the provided 'optionsValues' is a valid type (array or object),
    // then changes the first selected option to the first avaliabe option
    const isValidOptions =
        Array.isArray(optionsValues) ||
        (typeof optionsValues === "object" && optionsValues !== null);
    if (!isValidOptions) {
        console.error(
            `Invalid type '${typeof optionsValues}' received in 'Dropdown' component for the parameter 'optionsValues'. It should be an array or a object.`
        );

        return <ErrorFallback componentName="Dropdown" />;
    } else {
        !selected &&
            setSelected(
                Array.isArray(optionsValues)
                    ? optionsValues[0]
                    : Object.values(optionsValues)[0]
            );
    }

    const dataValues = Array.isArray(optionsValues)
        ? optionsValues
        : Object.keys(optionsValues);
    const options = Array.isArray(optionsValues)
        ? optionsValues
        : Object.values(optionsValues);

    const handleClick = (option, index) => {
        setSelected(option);
        setIsOpen(false);

        const selectedDataValue = dataValues[index];
        handleSelect(name, selectedDataValue);
    };

    const handleKeyDown = (e) => {
        if (!isOpen) return;

        if (e.key === "Escape") setIsOpen(false);
        else if (
            e.currentTarget.tagName === "LI" &&
            (e.key === "Enter" || e.key === " ")
        ) {
            e.preventDefault();
            handleClick(e.currentTarget.textContent);
        }
    };

    return (
        <div
            className={styles.dropdown}
            style={{ borderRadius: isOpen ? "5px 5px 0 0" : "5px" }}
            ref={dropdownRef}
            onKeyDown={handleKeyDown}
        >
            <input type="hidden" name={name} value={selected} />

            <div className={styles.dropdown__buttonContainer}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className={styles.button}
                    id="dropdown__button"
                    aria-expanded={isOpen}
                    aria-activedescendant={
                        isOpen ? `dropdown-option-${selected}` : undefined
                    }
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-controls="dropdown__menu"
                    tabIndex={0}
                >
                    <span className={styles.button__label}>{selected}</span>
                    <span className={styles.button__icon}></span>
                </button>
            </div>

            <ul
                style={{ display: isOpen ? "inline-block" : "none" }}
                className={styles.dropdown__content}
                id="dropdown__menu"
                role="listbox"
                aria-labelledby="dropdown__button"
            >
                {options.map((option, index) => (
                    <li
                        onClick={() => handleClick(option, index)}
                        onKeyDown={handleKeyDown}
                        data-value={dataValues[index]}
                        id={`dropdown-option-${option}`}
                        className={styles.dropdown__option}
                        key={dataValues[index]}
                        role="option"
                        aria-selected={selected === option}
                        tabIndex={0}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Dropdown.propTypes = {
    optionsValues: PropTypes.oneOf([PropTypes.array, PropTypes.object])
        .isRequired,
    handleSelect: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default Dropdown;
