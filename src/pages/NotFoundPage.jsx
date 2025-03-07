import { useEffect } from 'react'
import styles from './NotFoundPage.module.css'

const metaTags = [
	{ name: "description", content: "A página que você estava procurando não foi encontrada. Verifique o endereço ou volte para a página inicial." },
	{ name: "robots", content: "noindex, nofollow" }
]

function NotFoundPage() {
	
	// Updates the <meta> tags
	useEffect(() => {
		document.title = "LitKeep | Página não Encontrada"

		metaTags.forEach((name, content) => {
			let metaTag = document.querySelector(`meta[name=${name}`);

			if (!metaTag) {
				metaTag = document.createElement("meta");
				metaTag.name = name;
				document.head.appendChild(metaTag);
			}

			metaTag.content = content;
		})
	}, [])

	return (<>
		
	</>)
}

export default NotFoundPage
