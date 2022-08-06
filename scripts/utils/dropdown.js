import { Dropdown } from "../classes/dropdown.js";

// VARIABLES
var ddIngredientsElt = document.getElementById("dd-ingredients");
var ddApplianceElt = document.getElementById("dd-appliance");
var ddUstensilsElt = document.getElementById("dd-ustensils");


// FUNCTIONS

export function updateDropdowns(data) {
  const { ingredients, appliances, ustensils } = extractArraysData(data);
  
  let ddIngredients = new Dropdown(ddIngredientsElt, ingredients, "ingredients");
  let ddAppliance = new Dropdown(ddApplianceElt, appliances, "appliance");
  let ddUstensils = new Dropdown(ddUstensilsElt, ustensils, "ustensils");
  
  ddIngredients.renderList();
  ddAppliance.renderList();
  ddUstensils.renderList();
}


function extractArraysData(data) {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      const recipe = data[i];
      
      // create ingredient array dropdown list
      if(recipe.ingredients) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ing = recipe.ingredients[j].ingredient;
  
          if (ingredients.indexOf(ing) === -1) {
            ingredients.push(ing);
          }
        }
      }

      // create ustensiles array dropdown list
      if(recipe.ustensils) {
        for(let j = 0; j < recipe.ustensils.length; j++) {
          const ust = recipe.ustensils[j];
          
          if (ustensils.indexOf(ust) === -1) {
            ustensils.push(ust);
          }
        }
      }
        
      // create appliance array dropdown list
      if(recipe.appliance) {
        if (appliances.indexOf(recipe.appliance) === -1) {
          appliances.push(recipe.appliance);
        }
      }
    }
  }

  return {
    ingredients,
    appliances,
    ustensils
  };
}
