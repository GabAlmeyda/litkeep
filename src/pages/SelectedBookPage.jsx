import { Helmet } from 'react-helmet'
import styles from './SelectedBookPage.module.css'

function SelectedBookPage() {

	return (<>
		<Helmet>
			<title>{`LitKeep | `}</title>
			<meta name='robots' content='noindex, nofollow' />
			<meta name="description" content={`Confira as informações do livro ${""} cadastradas. Veja sua nota, sua descrição, o tempo de leitura e muito mais.`} />
		</Helmet>
	</>)
}

export default SelectedBookPage
