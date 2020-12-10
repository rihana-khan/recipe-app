import React, { useState, useEffect, useContext } from 'react'; //instralling react for this page;
import AddRecipe from '../components/button/AddRecipe';
import Recipe from '../components/recipe/Recipe';
import Loader from '../components/loader/Loader';
import AuthContext from '../contexts/AuthContext';
import { withRouter } from 'react-router-dom';
import DeleteRecipe from '../api/DeleteRecipe';
import './Home.css'

function Home(props) {
    const [recipes, setRecipes] = useState([]); // store all recipes
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthContext);

    useEffect(() => {
        fetch('/recipes')
            .then((res) => res.json())
            .then((res) => {
                setRecipes(res.recipes)
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])
    const handleRecipe = (recipeId) => props.history.push('/recipes/' + recipeId);

    const handleDeleteRecipe = recipeId => {
        DeleteRecipe(recipeId, context)
            .then((res) => {
                if (res.successMsg) {
                    fetch('/recipes')
                        .then((res) => res.json())
                        .then((res) => {
                            setRecipes(res.recipes)
                            setLoading(false);
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="recipes_wrapper home-wrapper">
            <div className="recipe_add_action">
                <AddRecipe />
            </div>
            {loading && recipes && recipes.length === 0 && (
                <div className="loader_wrap">
                    <Loader width={120} height={120} />
                </div>
            )}
            <div className="recipes" data-testid="recipes">
                {!loading && recipes && recipes.length === 0 && (
                    <h2>No, items found</h2>
                )}
                {recipes &&
                    recipes.map((recipe) => {
                        return (
                            <div className="each_recipe">
                                <Recipe
                                    recipe={recipe}
                                    handleRecipe={handleRecipe}
                                    key={recipe._id}
                                    deleteRecipe={handleDeleteRecipe}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>

    )
}

export default withRouter(Home)
