/**
 * api for search recipes
 */

const SearchRecipes = (searchVal) => {
	return fetch('/recipes/search/' + searchVal)
		.then((res) => res.json())
		.then((res) => {
			return res.recipes;
		})
		.catch((err) => {
			console.log(err);
		})
}

export default SearchRecipes;