import { Helmet } from 'react-helmet'

import styles from './DataBasePage.module.css'

function DataBasePage() {

	return (<>
		<Helmet>
			<title>LitKeep | </title>
			<meta name='robots' content='noindex, nofollow'/>
			<meta name="description" content="Adicione qualquer livro rapidamente! Tenha acesso a coleção e remova, atualize ou filtre os livros que achar necessário." />
		</Helmet>
	</>)
}

export default DataBasePage
