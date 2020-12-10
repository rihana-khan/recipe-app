const DeleteRecipe = async (recipeId, context) => {
    const settings = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            recipeId
        }),
    };
    return fetch('/recipes/delete-recipe', settings)
        .then((res) => res.json())
        .then((res) => {
            if (res.successMsg) {
                return res;
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

export default DeleteRecipe;

