// IMPORTS
import { displayData } from "../pages/index.js";
import { updateDropdowns } from "./dropdown.js";
import { recipes } from "../../data/recipes.js";
import { updateTags } from "./tag.js";

// VARIABLES
export let tags  = new Array;
export let results = new Array;
var mainSearchForm = document.getElementById("mainSearch");

// EVENTS
mainSearchForm.addEventListener('input', (e) => filteredRecipes(e));


/**
 * Search recipes (in name/description/ingredients) with value input
 * @param {*} e Event for get value input 
 */
async function filteredRecipes(e) {
  const searchString = e.target.value.toLowerCase();
  let res = new Array;

  // if input value is superior at 2
  if(searchString.length > 2) {
    for(let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const name = recipe.name.toLowerCase();
      const desc = recipe.description.toLowerCase();
      const ingredients = recipe.ingredients; //ingredients array
      
      // check if value is present in name / description
      if (name.includes(searchString) || desc.includes(searchString)) {
        if (res.indexOf(recipe) === -1) {
          res.push(recipe);
        }
      }
      
      // check if value is present in ingredients
      for (let j = 0; j < ingredients.length; j++) {
        const ing = ingredients[j].ingredient.toLowerCase();
        
        if (ing.includes(searchString)) {
          if (res.indexOf(recipe) === -1) {
            res.push(recipe);
          }
        }
      }
    }
    
    results = res;

    updateTags(tags);
    displayData(results);
    updateDropdowns(results);
  } else {
    updateTags(tags);
    displayData(recipes);
    updateDropdowns(recipes);
  }
}


/**
 * 
 * @param {array} recipes recipes data (results after main search or recipesData if results is null)
 * @param {string} tag tag value selected
 */
export function filteredRecipesByTag(recipes, tagsSelected) {
  // test tags
  // updateTags(tags);

  // const searchString = e.target.value.toLowerCase();
  // let res = new Array;

  // // if input value is superior at 2
  // if(searchString.length > 2) {
  //   for(let i = 0; i < recipes.length; i++) {
  //     const recipe = recipes[i];
  //     const name = recipe.name.toLowerCase();
  //     const desc = recipe.description.toLowerCase();
  //     const ingredients = recipe.ingredients; //ingredients array
      
  //     // check if value is present in name / description
  //     if (name.includes(searchString) || desc.includes(searchString)) {
  //       if (res.indexOf(recipe) === -1) {
  //         res.push(recipe);
  //       }
  //     }
      
  //     // check if value is present in ingredients
  //     for (let j = 0; j < ingredients.length; j++) {
  //       const ing = ingredients[j].ingredient.toLowerCase();
        
  //       if (ing.includes(searchString)) {
  //         if (res.indexOf(recipe) === -1) {
  //           res.push(recipe);
  //         }
  //       }
  //     }
  //   }
    
  //   results = res;

  //   updateTags(tags);
  //   displayData(results);
  //   updateDropdowns(results);
  // } else {
  //   updateTags(tags);
  //   displayData(recipes);
  //   updateDropdowns(recipes);
  // }
}