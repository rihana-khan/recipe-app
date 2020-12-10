const express = require("express");
const checkAuth = require("../middlewares/check-auth")
//const checkAuth = require("../middlewares/check-auth");
const router = express.Router();
const recipeController = require("../controllers/recipes");
router.get("/", recipeController.getRecipes);
router.get("/get-recipe/:recipeId", recipeController.getRecipeDetails);
router.post("/addRecipe", checkAuth, recipeController.addRecipe);
router.post("/:recipeId", recipeController.editRecipeDetails);
router.get("/get_edited_recipe/:recipeId", recipeController.fetchEditRecipe);
router.put("/saveRecipe/:recipeId", recipeController.saveEditRecipe);
router.get("/search/:searchVal", recipeController.searchRecipes);
router.delete("/delete-recipe", recipeController.deleteRecipe);
module.exports = router;
