import styles from "./LandingPage.module.css";

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
    return (<>
        <Header navWithoutLogo customClass={styles.header}>
            <div className={styles.imageContainer}>
                <img src="/images/hero-image.png" alt="Pessoas em cima de um livro, que está acima do céu" />
            </div>
            

            <h1>O mais completo site para <span>armazenar suas memórias</span></h1>
            <h2>Armazene todas as informações dos seus livros, tudo num único lugar</h2>
            
            <div className={styles.linkButtonContainer}>
                <LinkButton
                    label="Acesse nossa página"
                    to="/"
                    color="accent"
                    customClasses="bigger"
                />
            </div>
        </Header>

        <section className={styles.features}>
            <h2>Tenha total controle sobre os livros que armazena</h2>

            {/* Add feature */}
            <div className={`${styles.feature} ${styles.featureAdd}`}>
                <h3 className={styles.feature__desc}>Adicione seus melhores livros ao seu catálogo pessoal</h3>

                <hr className={styles.feature__line} />

                <div className={styles.feature__card}>
                    <div className={styles.card__icon}>
                        <IoIosAddCircleOutline />
                    </div>

                    <p className={styles.card__text}>Adicione qualquer livro</p>
                </div>
            </div>
            
            {/* Remove feature */}
            <div className={`${styles.feature} ${styles.featureRemove}`}>
                <h3 className={styles.feature__desc}>Remova a qualquer momento o que precisar com apenas um clique</h3>

                <hr className={styles.feature__line} />

                <div className={styles.feature__card}>
                    <div className={styles.card__icon}>
                        <IoIosCloseCircleOutline />
                    </div>

                    <p className={styles.card__text}>Remova o que precisar</p>
                </div>
            </div>

            {/* Update feature */}
            <div className={`${styles.feature} ${styles.featureUpdate}`}>
                <h3 className={styles.feature__desc}>Altere qualquer informação que você tenha digitado errado</h3>

                <hr className={styles.feature__line} />

                <div className={styles.feature__card}>
                    <div className={styles.card__icon}>
                        <MdOutlineChangeCircle />
                    </div>

                    <p className={styles.card__text}>Altere o que for necessário</p>
                </div>
            </div>
        </section>
    </>);
}

export default LandingPage;
