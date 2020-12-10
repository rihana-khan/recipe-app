/**
 * Fetching recipe by username
 */

const FetchRecipeByUser = username => {
    return fetch(`/users/get-user/${username}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            if (res.user) {
                return res;
            }
        })
        .catch((err) => {
            throw new Error(err);
        });
}

export default FetchRecipeByUser;