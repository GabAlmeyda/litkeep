import { useEffect, useState } from "react";

function useTheme() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

	const toggleTheme = () => {
		const newTheme = theme === light ? "dark" : "light";
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	}

	useEffect(() => {
		document.body.classList.remove("light", "dark");
		document.body.classList.add(theme);
	}, [theme]);

	return [theme, toggleTheme];
}

export default useTheme