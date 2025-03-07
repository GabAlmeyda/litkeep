import { useEffect } from "react";
import styles from "./SelectedBookPage.module.css";

const metaTags = [
    {
        name: "description",
        content: `Confira as informações do livro ${"PLACEHOLDER"} cadastradas. Veja sua nota, sua descrição, o tempo de leitura e muito mais.`,
    },
    { name: "robots", content: "noindex, nofollow" },
];

function SelectedBookPage() {
    // Updates the <meta> tags
    useEffect(() => {
        document.title = `LitKeep | ${"PLACEHOLDER"}`;

        metaTags.forEach(({ name, content }) => {
            let metaTag = document.querySelector(`meta[name=${name}`);

            if (!metaTag) {
                metaTag = document.createElement("meta");
                metaTag.name = name;
                document.head.appendChild(metaTag);
            }

            metaTag.content = content;
        });
    }, []);

    return <></>;
}

export default SelectedBookPage;
