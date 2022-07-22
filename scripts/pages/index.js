// IMPORTS
import { recipes } from "../../data/recipes.js";
import { recipeFactory } from "../factories/recipe.js";
import { updateDropdowns } from "../utils/dropdown.js";

/**Add all cards recipes in photographer_section on index.html
 * @param  {object} recipes Data of all recipes
 */
export async function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-list");
    recipesSection.innerHTML = '';

    if(recipes.length > 0) {
        // remove flex css if suggest already display
        recipesSection.classList.remove('recipes-suggest');

        recipes.forEach((recipe) => {
            const recipeModel = recipeFactory(recipe);
            const recipeCardDOM = recipeModel.renderRecipeCardDOM();
            recipesSection.appendChild(recipeCardDOM);
        });
    } else {
        // add fless css for suggestion error
        recipesSection.classList.add('recipes-suggest');
        recipesSection.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
    }

}

/**Initialize the index page
 */
async function init() {
    // display recipes
    displayData(recipes);
    updateDropdowns(recipes);
}

init();
    