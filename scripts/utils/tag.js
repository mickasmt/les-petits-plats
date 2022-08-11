// IMPORTS
import { tagFactory } from "../factories/tag.js";
import { filteredRecipesByTag } from "./search.js";

// VARIABLES
var tagsSection = document.getElementById("tags-section");

// FUNCTIONS
/**
 *
 * @param {*} data Array of objects {name, type} of tag
 */
export function updateTags(tags) {
  if (tags.length > 0) {
    tagsSection.innerHTML = "";

    tags.forEach(tag => {
      const tagsModel = tagFactory(tag);
      const tagCardDOM = tagsModel.renderTagCardDOM();
      tagsSection.appendChild(tagCardDOM);
    });
  } else {
    // return empty tags array + html
    tags = [];
    tagsSection.innerHTML = "";
  }
  
  // search recipes after update tags array
  // console.log("update");
  filteredRecipesByTag(tags);
}
