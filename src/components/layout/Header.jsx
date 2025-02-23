import React from 'react'

import styles from './Header.module.css'

import Navbar from './Navbar'


/**
 * Renders a customizable header element.
 * 
 * @param {boolean} [navWithoutLogo] - If present, the 'Navbar' component will not 
 * display the site's logo;
 * @param {string} [customClass] - Optional custom class for styling.
 * @param {React.ReactNode} [children] - Optional content to be rendered inside the header. If no
 * content is passed, the header will only contain the 'Navbar' component.
 * 
 * @returns {JSX.Element} The rendered header component.
 */
function Header({ navWithoutLogo, customClass, children }) {

	return (
		<header className={`${styles.header} ${customClass}`}>
			<Navbar withoutLogo={navWithoutLogo} />

			{children}
		</header>
	)
}

export default Header