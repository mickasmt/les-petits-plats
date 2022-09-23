// IMPORTS
import { displayData } from "../pages/index.js";
import { updateDropdowns } from "./dropdown.js";
import { recipes } from "../../data/recipes.js";

// VARIABLES
export let tags = new Array();
export let results = new Array();
var mainSearchForm = document.getElementById("mainSearch");

// EVENTS
mainSearchForm.addEventListener("input", () => filteredRecipes());

/**
 * Search recipes (in name/description/ingredients) with value input
 */
export function filteredRecipes() {
  let res = new Array();
  let searchString = mainSearchForm.value.toLowerCase();

  // if input value is superior at 2
  if (searchString.length > 2) {
    res = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchString) ||
        recipe.description.toLowerCase().includes(searchString) ||
        recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(searchString)
      )
    );

    results = [...new Set(res)];

    displayData(results);
    updateDropdowns(results);
    filteredRecipesByTag();
  } else {
    results = [];
    displayData(recipes);
    updateDropdowns(recipes);
    filteredRecipesByTag();
  }
}

/**
 * Search recipes (in ingredients/appliance/ustensils) with tags array
 */
export function filteredRecipesByTag() {
  // get all recipes or results after one first research
  let data;
  let res = new Array();

  if (results.length > 0) {
    data = results;
  } else {
    data = recipes;
  }

  // check all recipes for each tag selected
  tags.forEach((tag) => {
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

    data = [...new Set(res)];
  });

  displayData(data);
  updateDropdowns(data);
}
