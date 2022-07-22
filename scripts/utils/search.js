// IMPORTS
import { displayData } from "../pages/index.js";
import { updateDropdowns } from "./dropdown.js";

// VARIABLES
var mainSearchForm = document.getElementById("mainSearch");

// EVENTS
mainSearchForm.addEventListener('input', (e) => filteredRecipes(e));


/**
 * Search recipes (in name/description/ingredients) with value input
 * @param {*} e Event for get value input 
 */
async function filteredRecipes(e) {
  const searchString = e.target.value.toLowerCase();
  let recipes = window.recipesData;
  let results = new Array;

  // if input value is superior at 2
  if(searchString.length > 2) {

    for(let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const name = recipe.name.toLowerCase();
      const desc = recipe.description.toLowerCase();
      const ingredients = recipe.ingredients; //ingredients array
      
      // check if value is present in name / description
      if (name.includes(searchString) || desc.includes(searchString)) {
        if (results.indexOf(recipe) === -1) {
          results.push(recipe);
        }
      }
      
      // check if value is present in ingredients
      for (let j = 0; j < ingredients.length; j++) {
        const ing = ingredients[j].ingredient.toLowerCase();
        
        if (ing.includes(searchString)) {
          if (results.indexOf(recipe) === -1) {
            results.push(recipe);
          }
        }
      }
    }
    
    window.results = results;
    // console.log(window.results);
    displayData(results);
    updateDropdowns(results);
  } else {
    displayData(recipes.slice(0,6));
  }
}


/**
 * 
 * @param {array} recipes recipes data (results after main search or recipesData if results is null)
 * @param {string} tag tag value selected
 */
async function filteredRecipesByTag(recipes, tag) {

}