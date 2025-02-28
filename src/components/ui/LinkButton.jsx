import clsx from 'clsx';
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
 * @param {string} [customClasses] - The custom classes natively provided by 
 * 'LinkButtton'component. All of them are listed bellow:
 *  - **onlyStroke:** If provided, the button background will be transparent and 
 * the stroke will reveive the specified color. Defaults to 'true' if present;
 *  - **bigger:** If provided, the button's size will be bigger.
 * 
 * @returns {JSX.Element} The rendered link button for navigation.
 */
function LinkButton({ label, to, color, customClasses }) {
		
	return (
		<Link to={to} className={styles.linkContainer}>
			<button className={clsx(
				styles.button,
				styles[color],
				customClasses && customClasses.split(" ").map(cls => styles[cls])
			)}
			>
				{label}
			</button>
		</Link>
	)
}

export default LinkButton