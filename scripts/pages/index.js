// IMPORTS
import { recipeFactory } from "../factories/recipe.js";
import { recipes } from "../../data/recipes.js";

/**Return all recipes in array
 */
async function getRecipes() {    
    console.log(recipes.splice(0, 12));
    return recipes;
}


/**Add all cards recipes in photographer_section on index.html
 * @param  {object} recipes Data of all recipes
 */
async function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-list");

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.renderRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

/**Initialize the index page
 */
async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getRecipes();
    // displayData(recipes);
}

init();
    