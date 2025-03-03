import styles from './Homepage.module.css'

import Header from '../components/layout/Header'

function Homepage() {

	

	return (<>
		<Header />

		<section className={styles.information}>
			<h2>Informações Gerais</h2>

		</section>
	</>)
}

export default Homepage
