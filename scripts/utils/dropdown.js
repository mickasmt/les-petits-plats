// VARIABLES
var ddIngredientsElt = document.getElementById("dd-ingredients");
var ddAppareilsElt = document.getElementById("dd-appareils");
var ddUstensilesElt = document.getElementById("dd-ustensiles");


export function updateDropdowns(data) {
  const { ingredients, appareils, ustensiles } = extractArraysData(data);

  let ddIngredient = new Dropdown(ddIngredientsElt, ingredients);
  let ddAppareils = new Dropdown(ddAppareilsElt, appareils);
  let ddUstensiles = new Dropdown(ddUstensilesElt, ustensiles);
  
  ddIngredient.renderList();
  ddAppareils.renderList();
  ddUstensiles.renderList();
}

function extractArraysData(data) {
  let ingredients = [];
  let appareils = [];
  let ustensiles = [];

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
          
          if (ustensiles.indexOf(ust) === -1) {
            ustensiles.push(ust);
          }
        }
      }
        
      // create appareils array dropdown list
      if(recipe.appliance) {
        if (appareils.indexOf(recipe.appliance) === -1) {
          appareils.push(recipe.appliance);
        }
      }
    }
  }

  return {
    ingredients,
    appareils,
    ustensiles
  };
}

// FUNCTIONS

// extrait les tableaux ingredient / appareils / ustensiles des resultats

// maj chaque dropdown avec les tableaux

// dropdown

// open dropdown list after button img

// cacher label et afficher liste quand clique sur input
