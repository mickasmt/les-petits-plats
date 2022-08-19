import { tags } from "../utils/search.js";
import { updateTags } from "../utils/tag.js";

/**Centralize all function for tag
 * @param  {object} data
 */
export function tagFactory(data) {
  const { name, type } = data;

  /**Create and return one tag DOM for index.html
   */
  function renderTagCardDOM() {
    // add color class by type with switch case

    // create tag name
    const tagTitle = document.createElement("span");
    tagTitle.textContent = name;

    // create close img
    const closeImg = document.createElement("img");
    closeImg.src = "assets/icons/close.svg";
    closeImg.alt = "closeTag";

    // create close button tag
    const btnClose = document.createElement("button");
    btnClose.appendChild(closeImg);
    btnClose.addEventListener("click", () => closeTag(name, type));

    // assemble tag name/button close
    const tagLabel = document.createElement("div");
    tagLabel.classList.add("tag");
    tagLabel.classList.add(`dd-${type}`);
    tagLabel.appendChild(tagTitle);
    tagLabel.appendChild(btnClose);

    return tagLabel;
  }

  /**
   * Function for remove tag in tags array
   * @param {*} name Name of the tag
   * @param {*} type Type of the tag
   */
  function closeTag(name, type) {
    // remove tag selected in tags section with index
    const indexTag = tags.findIndex((tag) => tag.name === name && tag.type === type);
    tags.splice(indexTag, 1);

    // update tags array
    updateTags(tags);
  }

  return {
    renderTagCardDOM,
  };
}
