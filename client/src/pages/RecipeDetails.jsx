import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import './RecipeDetails.css';

const RecipeDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState({});
    const [user, setUser] = useState({});
    const [errMsg, setErrMsg] = useState('');
    const { recipeId } = useParams();

    useEffect(() => {
        let isMounted = true;
        fetch(`/recipes/get-recipe/${recipeId}`)
            .then((res) => res.json())
            .then((res) => {
                if (isMounted) {
                    if (res.error) {
                        setErrMsg(res.error);
                    } else {
                        setRecipe(res.recipe);
                        setUser(res.user);
                        setLoading(false);
                    }
                }
            })
            .catch((err) => {
                setLoading(true);
            });

        return () => {
            // eslint-disable-next-line
            isMounted = false;
        };
    }, [recipeId]);

    const goToUser = (username) => props.history.push('/users/' + username);

    return (
        <div
            className="recipe_details_wrapper"
            style={{ width: '75%', margin: '0 auto' }}
        >
            {errMsg && (
                <div className="error_msg_wrap">
                    <h2>{errMsg}</h2>
                </div>
            )}
            {!errMsg && loading && (
                <div className="loader_wrap">
                    <Loader width={120} height={120} />
                </div>
            )}
            {!errMsg && !loading && (
                <>
                    <div className="recipe_header">
                        <div className="recipe_image">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    '/uploads/' +
                                    recipe.recipeImage
                                }
                                alt={recipe.title}
                                style={{ maxWidth: '100%' }}
                            />
                        </div>
                        <div className="recipe_ingredients_wrap">
                            <h2>Ingredients</h2>
                            {recipe.ingredients &&
                                recipe.ingredients.map((ing, index) => {
                                    if (ing.key !== '' && ing.value !== '') {
                                        return (
                                            <p key={index}>
                                                <b>{ing.key}</b> - {ing.value}
                                            </p>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                        </div>
                    </div>
                    <div className="recipe_content">
                        <h1>
                            {recipe.title}{' '}
                            <span className="recipe_creator">
                                by{' '}
                                <span
                                    onClick={() => goToUser(user.username)}
                                    className="recipe_cretor_name"
                                >
                                    {user.name}
                                </span>
                            </span>
                        </h1>
                        <hr />
                        <p>{recipe.description}</p>
                        <div className="recipe_nutritions_wrap">
                            <h2>Nutritions</h2>
                            <hr />
                            {!recipe.calories &&
                                !recipe.cholesterol &&
                                !recipe.fiber &&
                                !recipe.fat &&
                                !recipe.protein && <h3>No Nutritions Given</h3>}
                            <p>
                                {recipe.calorie && (
                                    <>
                                        <strong>Calories</strong>: {recipe.calorie}
                                    </>
                                )}{' '}
                                {recipe.cholesterol && (
                                    <>
                                        , <strong>Cholesterol</strong>:{' '}
                                        {recipe.cholesterol}
                                    </>
                                )}{' '}
                                {recipe.fiber && (
                                    <>
                                        , <strong>Fiber</strong>: {recipe.fiber}
                                    </>
                                )}{' '}
                                {recipe.fat && (
                                    <>
                                        , <strong>Fat</strong>: {recipe.fat}
                                    </>
                                )}{' '}
                                {recipe.protein && (
                                    <>
                                        , <strong>Protein</strong>: {recipe.protein}
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default withRouter(RecipeDetails);
