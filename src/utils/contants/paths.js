/**
 * returns an object containing all the website paths bellow:
 * - **homepage**: the root of the website;
 * - **database**: the database page;
 * - **selectedBook**: the page for a selected book;
 * - **landingPage**: the landing page.
 * 
 * @returns {Object} An object containing all the website paths.
 */
export function getWebsitePaths() {
	const basePath = "/litkeep.vercel.app/";
	
	return {
		homepage: basePath,
		database: `${basePath}database`,
		selectedBook: `${basePath}book`,
		landingPage: `${basePath}landing-page`
	}
}

/**
 * Returns an objects containing all the server paths bellow:
 * - **basePath**: The root of the server;
 * - **books**: The collection of the books.
 * 
 * @returns {Object} An object containg all the server paths.
 */
export function getServerPaths() {
	const basePath = "http://localhost:3001/";
	
	return {
		basePath: basePath,
		books: `${basePath}books`
	}
}