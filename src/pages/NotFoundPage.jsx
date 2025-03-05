import { Helmet } from 'react-helmet'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {

	return (<>
		<Helmet>
			<title>LitKeep | Página não Encontrada</title>
			<meta name='robots' content='noindex, nofollow' />
			<meta name='description' content='A página que você estava procurando não foi encontrada. Verifique o endereço ou volte para a página inicial.'/>
		</Helmet>
	</>)
}

export default NotFoundPage
