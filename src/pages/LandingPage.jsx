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

    const featureCardsInfo = [
        {
            desc: "Adicione seus melhores livros ao seu catálogo pessoal",
            icon: <IoIosCloseCircleOutline />,
            text: "Adicione qualquer livro",
            class: "featureAdd"
        },
        {
            desc: "Remova a qualquer momento o que precisar com apenas um clique",
            icon: <IoIosCloseCircleOutline />,
            text: "Remova o que precisar",
            class: "featureRemove"
        },
        {
            desc: "Altere qualquer informação que você tenha digitado errado",
            icon: <MdOutlineChangeCircle />,
            text: "Altere o que for necessário",
            class: "featureUpdate"
        },
    ]

    const searchCardsInfo = [
        {
            text: "Ordem Alfabética",
            class: "alfaList"
        },
        {
            text: "Ordem Numérica",
            class: "numericList"
        },
        {
            text: "Livros Lidos",
            class: "readList"
        }
    ]

    const additionalCardsInfo = [
        {
            text: "Livros Abandonados:",
            number: 2,
            class: "abandonedBooks"
        },
        {
            text: "Livros Lidos:",
            number: 42,
            class: "readBooks"
        },
        {
            text: "Livros Não Lidos:",
            number: 5,
            class: "unreadBooks"
        }

    ]

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

                    {featureCardsInfo.map((cardInfo, index) => (
                        <div className={`${styles.feature} ${styles[cardInfo.class]}`} key={index}>
                            <h3 className={styles.feature__desc}>{ cardInfo.desc }</h3>

                            <hr className={styles.feature__line} />
                        
                            <div className={styles.card}>
                                <div className={styles.card__icon}>{ cardInfo.icon }</div>

                                <p className={styles.card__text}>{ cardInfo.text }</p>
                            </div>
                        </div>
                    ))}
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
                            {searchCardsInfo.map((cardInfo, index) => 
                                (<div className={`${styles.card} ${styles[cardInfo.class]}`} key={index}>
                                    <p className={styles.card__text}>{cardInfo.text}</p>
                                    <div className={styles.card__linesContainer}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <div className={styles.linesContainer__line} key={index}></div>
                                        ))}
                                    </div>         
                                </div>)
                            )}
                        </div>

                        {/* The background shape container */}
                        <div className={styles.shapesContainer}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div className={`${styles.shape} ${styles.square}`} key={index}></div>
                            ))}

                            {Array.from({ length: 6 }).map((_, index) => (
                                <div className={`${styles.shape} ${styles.circle}`} key={index}></div>
                            ))}

                            {Array.from({ length: 6 }).map((_, index) => (
                                <div className={`${styles.shape} ${styles.triangle}`} key={index}></div>
                            ))}
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
                        {additionalCardsInfo.map((cardInfo, index) => (
                            <div className={`${styles.card} ${styles[cardInfo.class]}`} key={index}>
                                <p className={styles.card__text}>{ cardInfo.text }</p>
                                <p className={styles.card__number}>{ cardInfo.number }</p>
                            </div>
                        ))}
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
