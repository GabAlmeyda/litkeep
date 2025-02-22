import React from 'react'

import styles from './Header.module.css'

import Navbar from './Navbar'


/**
 * Renders a customizable header element.
 * 
 * @param {string} [customClass] - Optional custom class for styling.
 * @param {React.ReactNode} [children] - Optional content to be rendered inside the header. If no
 * content is passed, the header will only contain the 'Navbar' component.
 * 
 * @returns {JSX.Element} The rendered header component.
 */
function Header({ customClass, children }) {
	return (
		<header className={`${styles.header} ${customClass}`}>
			<Navbar />

			{children}
		</header>
	)
}

export default Header