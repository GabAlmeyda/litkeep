import { useEffect } from "react";

import { getWebsitePaths } from "../../utils/constants/paths";

import styles from "./NotFoundPage.module.css";

import { MdError } from "react-icons/md";

import LinkButton from "../../components/ui/LinkButton";
import Header from '../../components/layout/Header';

const metaTags = [
    {
        name: "description",
        content:
            "A página que você estava procurando não foi encontrada. Verifique o endereço ou volte para a página inicial.",
    },
    { name: "robots", content: "noindex, nofollow" },
];

function NotFoundPage() {
    const WEBSITE_PATHS = getWebsitePaths();

    // Updates the <meta> tags
    useEffect(() => {
        document.title = "LitKeep | Página não Encontrada";

        metaTags.forEach((name, content) => {
            let metaTag = document.querySelector(`meta[name="${name}"]`);

            if (!metaTag) {
                metaTag = document.createElement("meta");
                metaTag.name = name;
                document.head.appendChild(metaTag);
            }

            metaTag.content = content;
        });
    }, []);

    return (
        <>
			<Header />
			
            <main>
                <section className={styles.error}>
                    <div className={styles.error__icon}>
                        <MdError aria-hidden="true" />
                    </div>
    
                    <h1 aria-describedby="error-description">Erro 404</h1>
                    <h2 id="error-description">Página não encontrada</h2>
    
                    <p>
                        Oh, não! Essa página parece não existir na nossa biblioteca.
                    </p>
    
                    <div className={styles.error__goBack}>
                        <p>
                            Mas não se preocupe, a página inicial está dentro do nosso catálogo. Que tal voltar?
                        </p>
        
                        <LinkButton
                            label="Página Inicial"
                            to={WEBSITE_PATHS.homepage}
                            color="accent"
                        />
                    </div> 
                </section>
            </main>
        </>
    );
}

export default NotFoundPage;
