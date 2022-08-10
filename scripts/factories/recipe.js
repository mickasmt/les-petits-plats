/**Centralize all function for recipe
 * @param  {object} data
 */
export function recipeFactory(data) {
  const {
    name,
    ingredients,
    time,
    description,
  } = data;

  /**Check if image or video field is in data object and return DOM element
   */
  function checkQuantityIngredient(ingredient) {
    if (Object.prototype.hasOwnProperty.call(ingredient, "quantity")) {
      return ": " + ingredient.quantity + " ";
    } else {
      return "";
    }
  }

  /**Check if field unit ingredient
   */
  function checkUnitIngredient(ingredient) {
    if (Object.prototype.hasOwnProperty.call(ingredient, "unit")) {
      return ingredient.unit;
    } else {
      return "";
    }
  }

  /**Create and return one user card DOM for index.html
   */
  function renderRecipeCardDOM() {
    const article = document.createElement("article");
    article.classList.add("recipe-card");

    // create fake img content
    const fakeImg = document.createElement("div");
    fakeImg.classList.add("img");

    // create ingredients list
    const ingList = document.createElement("ul");

    ingredients.forEach((element) => {
      const li = document.createElement("li");
      const line =
        element.ingredient.bold() +
        checkQuantityIngredient(element) +
        checkUnitIngredient(element);

      li.innerHTML = line;
      ingList.appendChild(li);
    });

    // create recipe description
    const descriptionPar = document.createElement("p");
    descriptionPar.textContent = description;

    // assemble details content
    const details = document.createElement("div");
    details.classList.add("details");
    details.appendChild(ingList);
    details.appendChild(descriptionPar);

    // create title recipe
    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = name;

    // create clock img
    const clockImg = document.createElement("img");
    clockImg.src = "assets/icons/clock.svg";
    clockImg.alt = "clock";

    // create clock span
    const clockSpan = document.createElement("span");
    clockSpan.textContent = time + " min";

    // create icon/hour content
    const hourInfos = document.createElement("div");
    hourInfos.classList.add("hour");
    hourInfos.appendChild(clockImg);
    hourInfos.appendChild(clockSpan);

    // assemble title/time
    const infos = document.createElement("div");
    infos.classList.add("infos");
    infos.appendChild(title);
    infos.appendChild(hourInfos);

    // assemble title/time
    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipe-card__container");
    recipeContainer.appendChild(infos);
    recipeContainer.appendChild(details);

    // create article
    article.appendChild(fakeImg);
    article.appendChild(recipeContainer);

    return article;
  }

  return {
    renderRecipeCardDOM,
  };
}
