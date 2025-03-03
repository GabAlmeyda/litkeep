import { useEffect, useState } from "react";

/**
 * A custom hook to manage and toggle between light and dark themes,
 * and persist the selected theme in localStorage.
 * 
 * This hook automatically applies to the &lt;html&gt; element the 'dark'
 * class if the theme is 'dark', otherwise no class is added, meaning that
 * the theme is set to 'light'.
 * 
 * @returns {[string, function]} Returns an array with the current theme value
 * and the toggle function to change it automatically.
 * 
 * @example
 * const [theme, toggleTheme] = useTheme();
 * 
 * console.log(theme) // The output will be the current theme ('light' or 'dark');
 * 
 * toggleTheme() // If the theme is 'light', then it will be changed to 'dark', and vice-versa.
 */
function useTheme() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	}

	useEffect(() => {
		if (theme === "light") document.documentElement.classList.remove("dark");
		else document.documentElement.classList.add("dark");
	}, [theme]);

	return [theme, toggleTheme];
}

export default useTheme