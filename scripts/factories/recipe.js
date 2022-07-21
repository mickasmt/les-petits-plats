/**Centralize all function for recipe
 * @param  {object} data
 */
export function recipeFactory(data) {
  const {
    id,
    name,
    serving,
    ingredients,
    time,
    description,
    appliances,
    ustensiles,
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
    // create ingredients list
    const ingList = document.createElement("ul");

    ingredients.forEach((element) => {
      const li = document.createElement("li");
      const line = element.ingredient.bold() + checkQuantityIngredient(element) + checkUnitIngredient(element);

      li.innerHTML = line;
      ingList.appendChild(li);
    });

    return `
      <article class="recipe-card">
        <div class="img"></div>

        <div class="recipe-card__container">
          <div class="infos">
            <h2 class="title">${name}</h2>
            <div class="hour">
              <img src="assets/icons/clock.svg">
              <span>${time} min</span>
            </div>
          </div>

          <div class="details">
            ${ingList.outerHTML}
            <p>${description}</p>
          </div>
        </div>
      </article>
    `;
  }

  return {
    renderRecipeCardDOM
  };
}
