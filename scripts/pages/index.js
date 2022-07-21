// IMPORTS
import { recipeFactory } from "../factories/recipe.js";
import { recipes } from "../../data/recipes.js";

// GLOBAL VARIABLES
window.recipesData = recipes;

/**Add all cards recipes in photographer_section on index.html
 * @param  {object} recipes Data of all recipes
 */
export async function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-list");
    recipesSection.innerHTML = '';

    if(recipes.length > 0) {
        recipes.forEach((recipe) => {
            const recipeModel = recipeFactory(recipe);
            const recipeCardDOM = recipeModel.renderRecipeCardDOM();
            recipesSection.insertAdjacentHTML('beforeend', recipeCardDOM);
        });
    } else {
        recipesSection.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
    }

}

/**Initialize the index page
 */
async function init() {
    // display recipes
    displayData(recipesData.slice(0, 6));
}

init();
    