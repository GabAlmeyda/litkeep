import styles from "./LandingPage.module.css";

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
    return (
        <>
            <Header customClass={styles.header}>
                <h1>O mais completo site para <span>armazenar suas memórias</span></h1>
                <h2>
                    Armazene todas as informações dos seus livros, tudo num
                    único lugar
				</h2>
				
				<div className={styles.linkButtonContainer}>
					<LinkButton
						label="Acesse nossa página"
						to="/"
						color="accent"
					/>
				</div>
            </Header>
        </>
    );
}

export default LandingPage;
