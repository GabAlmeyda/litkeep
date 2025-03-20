import PropTypes from "prop-types";
import clsx from "clsx";

import { bookShapeType } from "../../utils/propTypes/propTypes";
import { getWebsitePaths } from "../../utils/constants/paths";

import styles from "./BookList.module.css";

import InfoCard from "../../components/ui/InfoCard";
import TagCard from "../../components/ui/TagCard";
import MoreOptions from "../../components/ui/MoreOptions";
import { useNavigate } from "react-router-dom";

const moreOptionsMap = {
    view: "Ver o livro",
    update: "Editar o livro",
    remove: "Remover o livro",
};

/**
 * Renders a book list with all the registered books.
 *
 * @param {object} props - The properties of the component.
 * @param {Array<bookShapeType>} props.visibleBooks - An array containing the books to
 * be displayed inside the component.
 * @param {boolean} props.isMobile - A boolean value representing if the layout of the book list
 * should be addapted to mobile screens or desktop screens.
 * @param {boolean} props.isFetchFinished - The success fetch status of the request.
 *
 * @returns {JSX.Element} A JSX element representing the book list component.
 */
function BookList({ visibleBooks, isFetchFinished, isMobile }) {
    const navigate = useNavigate();

    const WEBSITE_PATHS = getWebsitePaths();

    const LOADING_BLANK_CARDS = isMobile ? 3 : 6;

    const handleMoreOptionSelect = (action, bookId) => {
        switch (action) {
            case "view":
            case "update":
            case "remove":
                navigate(WEBSITE_PATHS.database, { state: { bookId: bookId } });
                break;
            default:
                console.error(
                    `Invalid action '${action}' received in 'BookList'. Expected one of "view", "update" or "remove"`
                );
        }
    };

    return (
        <div className={styles.bookList__items} id="bookList__items">
            {isFetchFinished
                ? visibleBooks.map((book, index) => (
                      <InfoCard
                          alignment="left"
                          customClasses={clsx(!isMobile && "bigger")}
                          key={index}
                      >
                          <h3 className={styles.book__title}>{book.title}</h3>
                          <p className={styles.book__author}>{book.author}</p>

                          <div className={styles.book__btnIconContainer}>
                              <MoreOptions
                                  options={moreOptionsMap}
                                  handleSelect={(action) =>
                                      handleMoreOptionSelect(action, book.id)
                                  }
                              />
                          </div>

                          <div>
                              <TagCard key={index} genre={book.genre} />

                              <hr className={styles.book__line} />
                          </div>

                          <div className={styles.book__infoContainer}>
                              <p className={styles.bookInfo}>
                                  <span className={styles.bookInfo__label}>
                                      Começou em
                                  </span>
                                  <strong className={styles.bookInfo__data}>
                                      {book.startDate}
                                  </strong>
                              </p>
                              <p className={styles.bookInfo}>
                                  <span className={styles.bookInfo__label}>
                                      Terminou em
                                  </span>
                                  <strong className={styles.bookInfo__data}>
                                      {book.endDate}
                                  </strong>
                              </p>
                              <p className={styles.bookInfo}>
                                  <span className={styles.bookInfo__label}>
                                      Posse do livro
                                  </span>
                                  <strong className={styles.bookInfo__data}>
                                      {book.ownership}
                                  </strong>
                              </p>
                              <p className={styles.bookInfo}>
                                  <span className={styles.bookInfo__label}>
                                      Nota do livro
                                  </span>
                                  <strong className={styles.bookInfo__data}>
                                      {book.rating}
                                  </strong>
                              </p>
                          </div>
                      </InfoCard>
                  ))
                : Array.from({ length: LOADING_BLANK_CARDS }).map(
                      (_, index) => (
                          <InfoCard key={index}>
                              <div className={styles.loadingContainer}></div>
                          </InfoCard>
                      )
                  )}
        </div>
    );
}

BookList.propTypes = {
    visibleBooks: PropTypes.arrayOf(PropTypes.shape(bookShapeType)).isRequired,
    isFetchFinished: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default BookList;
