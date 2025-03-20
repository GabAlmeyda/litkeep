import { useState } from "react";
import styles from "./MoreOptions.module.css";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";

/**
 * Renders a custom dropdown component that display a list of options when
 * clicked. This component is typically used for providing addiitonal actions or
 * options.
 * 
 * @param {object} props - The properties of the component.
 * @param {JSX.Element} props.icon - The icon displayed inside the button to open the dropdown.
 * @param {object.<string, string>} props.options - An object where each key represents an 
 * action (e.g. 'edit', 'remove'), and the corresponding value is the text displayed for that
 * option.
 * @param {function} props.handleSelect - The function to handle the option
 * selection, receiving the key (data-value) of the selected option was an argument.
 * 
 * @example 
 * const options = {
 *     edit: "Edit book",
 *     remove: "Remove book",
 * };
 * 
 * function handleSelect(action) {
 *     console.log(`Selected action: ${action}`);
 * }
 * 
 * <MoreOptions 
 *     icon={<CiCircleMore />}
 *     options={options}
 *     handleSelect={handleSelect}
 * />
 *  
 * @returns {JSX.Element} A JSX element representing the more options dropdown 
 * component.
 */
function MoreOptions({ icon, options, handleSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target))
                setIsOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className={styles.dropdown} ref={menuRef}>
            <button
                className={styles.dropdown__button}
                onClick={() => setIsOpen(!isOpen)}
                id="dropdown__button"
                title="Mais opções"
                aria-expanded={isOpen}
                aria-label="Abrir menu de opções"
                role="combobox"
                aria-haspopup="listbox"
                aria-controls="dropdown__menu"
            >
                {icon}
            </button>

            <ul
                style={{ display: isOpen ? "flex" : "none" }}
                className={styles.dropdown__menu}
                id="dropdown__menu"
                role="listbox"
                aria-labelledby="dropdown__button"
            >
                {Object.entries(options).map(([key, label]) => (
                    <li
                        className={styles.dropdown__item}
                        onClick={() => handleSelect(key)}
                        data-action={key}
                        key={key}
                        tabIndex={0}
                        role="option"
                    >
                        {label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

MoreOptions.propTypes = {
    icon: PropTypes.element.isRequired,
    options: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired,
};

export default MoreOptions;
