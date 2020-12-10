import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../components/recipe/Recipe';
import AuthContext from '../contexts/AuthContext';
import SearchRecipes from '../api/SearchRecipes';
import DeleteRecipe from '../api/DeleteRecipe';

const Search = (props) => {
  const [recipes, setRecipes] = useState([]);
  const { searchVal } = useParams();
  const context = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    SearchRecipes(searchVal)
      .then((recipes) => {
        if (isMounted) {
          setRecipes(recipes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      // eslint-disable-next-line
      isMounted = false;
    };
  }, [searchVal]);

  const handleRecipe = (recipeId) => {
    props.history.push('/recipes/' + recipeId);
  };

  const handleDeleteRecipe = (recipeId) => {
    DeleteRecipe(recipeId, context)
      .then((res) => {
        if (res.successMsg) {
          SearchRecipes(searchVal)
            .then((recipes) => {
              setRecipes(recipes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="search_recipes_wrapper">
      <p style={{ textAlign: 'center' }}>
        Search result for: {searchVal}
      </p>
      <div className="recipes" data-testid="recipes">
        {recipes && recipes.length === 0 && <h2>No, items found</h2>}
        {recipes &&
          recipes.map((recipe) => {
            return (
              <Recipe
                recipe={recipe}
                handleRecipe={handleRecipe}
                key={recipe._id}
                deleteRecipe={handleDeleteRecipe}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Search;