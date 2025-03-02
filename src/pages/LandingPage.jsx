import { getWebsitePaths } from "../utils/contants/paths.js";

import styles from "./LandingPage.module.css";

import useLandingPageAnimations from "../utils/animations/LandingPageAnimations.jsx";

import { MdOutlineChangeCircle } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

import LinkButton from "../components/ui/LinkButton";

import Header from "../components/layout/Header";

/**
 * Renders the Landing Page component.
 *
 * This page is composed of five section:
 *
 * - **Hero section:** Attracts users with a simple introduction;
 * - **Features section:** Showcase all the functions and capabilities of the site;
 * - **Search section:** Display the avaliable filter and search functionalities;
 * - **Additional information section:** Showcase the additional information that the site
 * collects from the registered books;
 * - **Call-To-Action section:** Encourage user to engage with the site.
 *
 * @returns {JSX.Element} The rendered Landing Page.
 */
function LandingPage() {
    const websitePaths = getWebsitePaths();

    useLandingPageAnimations();

    return (
        <>
            <Header navWithoutLogo customClass={styles.header}>
                <div className={styles.imageContainer}>
                    <img
                        src="/images/hero-image.png"
                        alt="Pessoas em cima de um livro, que está acima do céu"
                    />
                </div>

                <h1>
                    O mais completo site para{" "}
                    <span>armazenar suas memórias</span>
                </h1>
                <h2>
                    Armazene todas as informações dos seus livros, tudo num
                    único lugar
                </h2>

                <div className={styles.linkButtonContainer}>
                    <LinkButton
                        label="Acesse nossa página"
                        to={websitePaths.homepage}
                        color="accent"
                        customClasses="bigger"
                    />
                </div>
            </Header>

            <main>
                {/* Features Section */}
                <section className={styles.features}>
                    <h2>Tenha total controle sobre os livros que armazena</h2>

                    {/* Add feature */}
                    <div className={`${styles.feature} ${styles.featureAdd}`}>
                        <h3 className={styles.feature__desc}>
                            Adicione seus melhores livros ao seu catálogo
                            pessoal
                        </h3>

                        <hr className={styles.feature__line} />
                       
                        <div className={styles.card}>
                            <div className={styles.card__icon}>
                                <IoIosAddCircleOutline />
                            </div>

                            <p className={styles.card__text}>
                                Adicione qualquer livro
                            </p>
                        </div>
                    </div>

                    {/* Remove feature */}
                    <div className={`${styles.feature} ${styles.featureRemove}`}>
                        <h3 className={styles.feature__desc}>
                            Remova a qualquer momento o que precisar com apenas
                            um clique
                        </h3>

                        <hr className={styles.feature__line} />

                        <div className={styles.card}>
                            <div className={styles.card__icon}>
                                <IoIosCloseCircleOutline />
                            </div>

                            <p className={styles.card__text}>
                                Remova o que precisar
                            </p>
                        </div>
                    </div>

                    {/* Update feature */}
                    <div className={`${styles.feature} ${styles.featureUpdate}`}>
                        <h3 className={styles.feature__desc}>
                            Altere qualquer informação que você tenha digitado
                            errado
                        </h3>

                        <hr className={styles.feature__line} />

                        <div className={styles.card}>
                            <div className={styles.card__icon}>
                                <MdOutlineChangeCircle />
                            </div>

                            <p className={styles.card__text}>
                                Altere o que for necessário
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search Section */}
                <section className={styles.search}>
                    <h2>Seus livros organizados como nunca viu</h2>
                    <p>
                        Com o LitKeep é possível ordenar por ordem alfabética,
                        ordem crescente de nota ou agrupar entre os livros que
                        você leu e não leu e muito mais!
                    </p>

                    <div className={styles.searchCardsWrapper}>
                        <div className={styles.cardsContainer}>
                            {/* Alfanumeric order list */}
                            <div className={`${styles.card} ${styles.alfaList}`}>
                                <p className={styles.card__text}>
                                    Ordem Alfabética
                                </p>
                                <div className={styles.card__linesContainer}>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                </div>
                            </div>

                            {/* Numeric order list */}
                            <div className={`${styles.card} ${styles.numericList}`}>
                                <p className={styles.card__text}>
                                    Ordem Numérica
                                </p>
                                <div className={styles.card__linesContainer}>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                </div>
                            </div>

                            {/* Read books list */}
                            <div className={`${styles.card} ${styles.readList}`}>
                                <p className={styles.card__text}>
                                    Livros Lidos
                                </p>
                                <div className={styles.card__linesContainer}>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                    <div
                                        className={styles.linesContainer__line}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* The background shape container */}
                        <div className={styles.shapesContainer}>
                            <div className={`${styles.shape} ${styles.square}`}></div>
                            <div className={`${styles.shape} ${styles.square}`}></div>
                            <div className={`${styles.shape} ${styles.square}`}></div>
                            <div className={`${styles.shape} ${styles.square}`}></div>
                            <div className={`${styles.shape} ${styles.square}`}></div>
                            <div className={`${styles.shape} ${styles.square}`}></div>

                            <div className={`${styles.shape} ${styles.circle}`}></div>
                            <div className={`${styles.shape} ${styles.circle}`}></div>
                            <div className={`${styles.shape} ${styles.circle}`}></div>
                            <div className={`${styles.shape} ${styles.circle}`}></div>
                            <div className={`${styles.shape} ${styles.circle}`}></div>
                            <div className={`${styles.shape} ${styles.circle}`}></div>

                            <div className={`${styles.shape} ${styles.triangle}`}></div>
                            <div className={`${styles.shape} ${styles.triangle}`}></div>
                            <div className={`${styles.shape} ${styles.triangle}`}></div>
                            <div className={`${styles.shape} ${styles.triangle}`}></div>
                            <div className={`${styles.shape} ${styles.triangle}`}></div>
                            <div className={`${styles.shape} ${styles.triangle}`}></div>
                        </div>
                    </div>
                </section>

                {/* Additional Information Section  */}
                <section className={styles.information}>
                    <h2>Tenha as informações que precisa sobre seus livros</h2>
                    <p>
                        Saiba quantos já leu, quantos foram abandonados ou
                        quantos ainda faltam ler, para começar o mais rápido
                        possível
                    </p>

                    <div className={styles.cardsContainer}>
                        {/* Abandoned books card */}
                        <div
                            className={`${styles.card} ${styles.abandonedBooks}`}
                        >
                            <p className={styles.card__text}>
                                Livros Abandonados:
                            </p>
                            <p className={styles.card__number}>2</p>
                        </div>

                        {/* Read books card */}
                        <div className={`${styles.card} ${styles.readBooks}`}>
                            <p className={styles.card__text}>Livros Lidos:</p>
                            <p className={styles.card__number}>42</p>
                        </div>

                        {/* Unread books card */}
                        <div className={`${styles.card} ${styles.unreadBooks}`}>
                            <p className={styles.card__text}>
                                Livros Não Lidos:
                            </p>
                            <p className={styles.card__number}>5</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.cta}>
                    <h2>Comece agora o seu registro</h2>
                    <p>
                        Estamos esperando sua presença para tornar o site ainda
                        melhor
                    </p>

                    <LinkButton
                        label="Acesse nossa página"
                        to={websitePaths.homepage}
                        color="accent"
                        customClasses="bigger"
                    />
                </section>
            </main>
        </>
    );
}

export default LandingPage;
