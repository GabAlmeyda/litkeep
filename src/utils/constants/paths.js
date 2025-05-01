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
	const basePath = "/";
	
	return {
		homepage: basePath,
		database: `${basePath}database`,
		book: `${basePath}book`,
		landingPage: `${basePath}landing-page`
	}
}

/**
 * Returns an objects containing all the server paths bellow:
 * - **index**: The root of the server;
 * - **books**: The collection of the books.
 * 
 * @returns {Object} An object containg all the server paths.
 */
export function getServerPaths() {
	const index = "https://litkeep-server.onrender.com/";
	
	return {
		index,
		books: `${index}books`
	}
}
