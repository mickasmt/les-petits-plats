// IMPORTS
import { recipeFactory } from "../factories/recipe.js";
import { recipes } from "../../data/recipes.js";

/**Return all recipes in array
 */
async function getRecipes() {
    return recipes.splice(0, 6);
}


/**Add all cards recipes in photographer_section on index.html
 * @param  {object} recipes Data of all recipes
 */
async function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-list");

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.renderRecipeCardDOM();
        recipesSection.insertAdjacentHTML('beforeend', recipeCardDOM);
    });
}

/**Initialize the index page
 */
async function init() {
    // get recipes
    const recipes = await getRecipes();
    // display recipes
    displayData(recipes);
}

init();
    