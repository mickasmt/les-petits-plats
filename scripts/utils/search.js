// IMPORTS
import { displayData } from "../pages/index.js";
import { updateDropdowns } from "./dropdown.js";
import { recipes } from "../../data/recipes.js";

// VARIABLES
export let tags = new Array();
export let results = new Array();
var mainSearchForm = document.getElementById("mainSearch");

// EVENTS
mainSearchForm.addEventListener("input", (e) => filteredRecipes(e));

/**
 * Search recipes (in name/description/ingredients) with value input
 * @param {*} e Event for get value input
 */
async function filteredRecipes(e) {
  let searchString;
  let res = new Array();
  console.log(mainSearchForm.value);

  if (e) {
    searchString = e.target.value.toLowerCase();
  } else {
    searchString = mainSearchForm.value.toLowerCase();
  }

  // if input value is superior at 2
  if (searchString.length > 2) {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const name = recipe.name.toLowerCase();
      const desc = recipe.description.toLowerCase();
      const ingredients = recipe.ingredients; //ingredients array

      // check if value is present in name / description
      if (name.includes(searchString) || desc.includes(searchString)) {
        res.push(recipe);
      }

      // check if value is present in ingredients
      for (let j = 0; j < ingredients.length; j++) {
        const ing = ingredients[j].ingredient.toLowerCase();

        if (ing.includes(searchString)) {
          res.push(recipe);
        }
      }
    }

    results = [...new Set(res)];

    displayData(results);
    updateDropdowns(results);
  } else {
    displayData(recipes);
    updateDropdowns(recipes);
  }
}

/**
 *
 * @param {string} tags tags selected
 */
export function filteredRecipesByTag(tagsSelected) {
  // get all recipes or results after one first research
  let data;
  let res = new Array();

  if (results.length > 0) {
    data = results;
  } else {
    data = recipes;
  }

  if (tagsSelected.length > 0) {
    // check all recipes for each tag selected
    tagsSelected.forEach((tag) => {
      const nameTag = tag.name.toLowerCase();
      const typeTag = tag.type.toLowerCase();

      switch (typeTag) {
        case "ingredients":
          // check if tag is present in ingredients
          res = data.filter((recipe) =>
            recipe.ingredients.some((ing) =>
              ing.ingredient.toLowerCase().includes(nameTag)
            )
          );

          break;
        case "appliance":
          // check if tag is present in appliance
          res = data.filter((recipe) =>
            recipe.appliance.toLowerCase().includes(nameTag)
          );
          // res = data.filter(recipe => recipe.appliance.some(app => ing.ingredient.toLowerCase().includes(nameTag)));
          break;
        case "ustensils":
          // check if tag is present in ustensils
          res = data.filter((recipe) =>
            recipe.ustensils.some((ust) => ust.toLowerCase().includes(nameTag))
          );
          break;
        default:
          // error if value is not found
          console.log(`Error ! ${value} not found`);
      }
    });

    results = res;

    displayData(results);
    updateDropdowns(results);
  } else {
    filteredRecipes();
  }
}
