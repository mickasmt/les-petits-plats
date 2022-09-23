// IMPORTS
import { displayData } from "../pages/index.js";
import { updateDropdowns } from "./dropdown.js";
import { recipes } from "../../data/recipes.js";

// VARIABLES
export let tags = [];
export let results = [];
var mainSearchForm = document.getElementById("mainSearch");

// EVENTS
mainSearchForm.addEventListener("input", () => filteredRecipes());


export function updateData(resultats) {
  displayData(resultats);
  updateDropdowns(resultats);
}

/**
 * Search recipes (in name/description/ingredients) with value input
 */
export function filteredRecipes() {
  let searchString = mainSearchForm.value.toLowerCase();

  // if input value is superior at 2
  if (searchString.length > 2) {
    const res = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchString) ||
        recipe.description.toLowerCase().includes(searchString) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchString)
        )
    );

    results = [...new Set(res)];
  } else {
    results = recipes;
  }

  if (tags.length > 0) filteredRecipesByTag();
  else updateData(results);
}

/**
 * Search recipes (in ingredients/appliance/ustensils) with tags array
 */
export function filteredRecipesByTag() {
  // get all recipes or results after one first research
  let res = [];
  let data = results.length > 0 ? results : recipes;

  // check all recipes for each tag selected
  tags.forEach((tag) => {
    const nameTag = tag.name.toLowerCase();
    const typeTag = tag.type.toLowerCase();

    switch (typeTag) {
      case "ingredients":
        // check if tag is present in ingredients
        const resIng = data.filter((recipe) =>
          recipe.ingredients.some((ing) =>
            ing.ingredient.toLowerCase().includes(nameTag)
          )
        );
        res = res.concat(resIng);
        break;

      case "appliance":
        // check if tag is present in appliance
        const resApp = data.filter((recipe) =>
          recipe.appliance.toLowerCase().includes(nameTag)
        );
        res = res.concat(resApp);
        break;
      
      case "ustensils":
        // check if tag is present in ustensils
        const resUst = data.filter((recipe) =>
          recipe.ustensils.some((ust) => ust.toLowerCase().includes(nameTag))
        );
        res = res.concat(resUst);
        break;
      
      default:
        // error if value is not found
        console.log(`Error ! ${value} not found`);
    }
  });
  
  // results = [...new Set(res)];

  updateData([...new Set(res)]);
}
