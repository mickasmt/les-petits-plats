// IMPORTS
import { tagFactory } from "../factories/tag.js";
import { filteredRecipesByTag, filteredRecipes, tags } from "./search.js";

// VARIABLES
var tagsSection = document.getElementById("tags-section");

// FUNCTIONS
/**
 * Update tags & tags section DOM
 * @param {*} data Array of objects {name, type} of tag
 */
export function updateTags() {
  if (tags.length > 0) {
    tagsSection.innerHTML = "";

    tags.forEach((tag) => {
      const tagsModel = tagFactory(tag);
      const tagCardDOM = tagsModel.renderTagCardDOM();
      tagsSection.appendChild(tagCardDOM);
    });

    filteredRecipesByTag();
  } else {
    tagsSection.innerHTML = "";
    filteredRecipes();
  }
}
