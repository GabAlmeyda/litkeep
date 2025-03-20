import PropTypes from "prop-types";

import styles from "./AdditionalInfoCards.module.css";

import InfoCard from "../../components/ui/InfoCard";

/**
 * Renders additional information inside of a `InfoCard` component. If the
 * fetch is in proccess, this component renders blank cards as a feddback.
 *
 * @param {object} props - The properties of the component.
 * @param {Array<bookShapeType>} props.additionalInfo - The array containing all 
 * the information to be displayed.
 * @param {boolean} props.isFetchFinished - The success fetch status of the request.
 *
 * @returns {JSX.Element} A JSX element representing the container of the 
 * information to be displayed.
 */
function AdditionalInfoCards({ additionalInfo, isFetchFinished }) {
    return (
        <dl className={styles.infoCardsContainer}>
            {additionalInfo.map((book, index) => (
                <InfoCard alignment="center" key={index}>
                    {isFetchFinished && book ? (
                        <>
                            <dt
                                className={styles.infoCard__num}
                                aria-describedby={book.label
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                    .replace(/[^0-9a-z-]/g, "")}
                            >
                                {book.num}
                            </dt>
                            <dd
                                className={styles.inforCard__label}
                                id={book.label
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                    .replace(/[^0-9a-z-]/g, "")}
                            >
                                {book.label}
                            </dd>
                        </>
                    ) : (
                        <span
                            className={styles.infoCard__loading}
                            role="status"
                        ></span>
                    )}
                </InfoCard>
            ))}
        </dl>
    );
}

AdditionalInfoCards.propTypes = {
    additionalInfo: PropTypes.arrayOf(
        PropTypes.shape({
            num: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    isFetchFinished: PropTypes.bool.isRequired,
};

export default AdditionalInfoCards;
