// IMPORTS
import { tagFactory } from "../factories/tag.js";

// VARIABLES
var tagsSection = document.getElementById("tags-section");

// FUNCTIONS
/**
 *
 * @param {*} data Array of objects {name, type} of tag
 */
export function updateTags(data) {
  if (data) {
    tagsSection.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const tagsModel = tagFactory(data[i]);
      const tagCardDOM = tagsModel.renderTagCardDOM();
      tagsSection.appendChild(tagCardDOM);
    }
  }
}
