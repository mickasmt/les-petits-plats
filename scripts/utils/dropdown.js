import { Dropdown } from "../classes/dropdown.js";

// VARIABLES
var ddIngredientsElt = document.getElementById("dd-ingredients");
var ddApplianceElt = document.getElementById("dd-appliance");
var ddUstensilsElt = document.getElementById("dd-ustensils");

// FUNCTIONS

/**
 * Initialiaze all dropdowns with all arrays return by extrctArraysData function
 * @param {*} data Array of all recipes after filteredRecipes function
 */
export function updateDropdowns(data) {
  const { ingredients, appliances, ustensils } = extractArraysData(data);

  const ddIngredients = new Dropdown(
    ddIngredientsElt,
    ingredients,
    "ingredients"
  );
  const ddAppliance = new Dropdown(ddApplianceElt, appliances, "appliance");
  const ddUstensils = new Dropdown(ddUstensilsElt, ustensils, "ustensils");

  ddIngredients.init();
  ddAppliance.init();
  ddUstensils.init();
}

/**
 * Extract the array of all distinct ingredients, appliances and ustensils contains in all recipes
 * @param {Array} data Array all recipes after filteredRecipes function
 * @returns Array ingredients, appliances, ustensils
 */
function extractArraysData(data) {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  if (data.length > 0) {
    // regroup all appliances in all recipes
    const appList = data
      .filter((recipe) => recipe.appliance)
      .map((app) => app.appliance.toLowerCase())
      .reduce((a, b) => a.concat(b), [])
      .sort();
    
    // regroup all ingredients in all recipes
    const ingList = data
    .filter((recipe) => recipe.ingredients)
    .map((ing) => ing.ingredients.map((i) => i.ingredient.toLowerCase()))
    .reduce((a, b) => a.concat(b), [])
    .sort();
    
    // regroup all ustensils in all recipes
    const ustList = data
      .filter((recipe) => recipe.ustensils)
      .map((ust) => ust.ustensils.map((u) => u.toLowerCase()))
      .reduce((a, b) => a.concat(b), [])
      .sort();

    // remove doublons data
    appliances = [...new Set(appList)];
    ustensils = [...new Set(ustList)];
    ingredients = [...new Set(ingList)];
  }

  return {
    ingredients,
    appliances,
    ustensils,
  };
}
