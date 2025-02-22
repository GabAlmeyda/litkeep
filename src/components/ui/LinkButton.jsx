import { Link } from 'react-router-dom'

import styles from './LinkButton.module.css'

/**
 * renders a customizable link button.
 * 
 * @param {string} label - The visible text of the button;
 * @param {string} to - The path where the button will navigate the user;  
 * @param {string} color - The two avaliable color options:
 * - **accent**
 * - **surface**  
 * @param {boolean} [onlyStroke] - If provided, the button background will be 
 * transparent and the stroke will reveive the specified color. Defaults to 'true' if present.
 * 
 * @returns {JSX.Element} The rendered link button for navigation.
 */
function LinkButton({ label, to, color, onlyStroke}) {

	return (
		<Link to={to} className={styles.linkContainer}>
			<button className={`${styles.button} ${styles[color]} ${onlyStroke && styles.onlyStroke}`}>
				{label}
			</button>
		</Link>
	)
}

export default LinkButton