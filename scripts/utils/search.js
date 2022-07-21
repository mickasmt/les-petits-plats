// IMPORTS
import { displayData } from "../pages/index.js";

// VARIABLES
var mainSearchForm = document.getElementById("mainSearch");

// EVENTS
mainSearchForm.addEventListener('input', (e) => filteredRecipes(e));


async function filteredRecipes(e) {
  const searchString = e.target.value.toLowerCase();
  let recipes = window.recipesData;
  let results = new Array;

  // if input value is superior at 2
  if(searchString.length > 2) {

    for(let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      
      if (recipe.name.toLowerCase().includes(searchString)) {
        results.push(recipe);
      }
    }
    // const filteredRecipes = hpCharacters.filter((character) => {
    //     return (
    //         character.name.toLowerCase().includes(searchString) ||
    //         character.house.toLowerCase().includes(searchString)
    //     );
    // });
    displayData(results);
  } else {
    displayData(recipes.slice(0,6));
  }

}