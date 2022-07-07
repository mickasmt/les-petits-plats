
/**Centralize all function for recipe
 * @param  {object} data
 */
 export function recipeFactory(data) {
  const { id, name, serving, ingredients, time, description, appliances, ustensiles } = data;

  /**Create and return one user card DOM for index.html
   */
  function renderRecipeCardDOM() {
      const article = document.createElement( 'article');

      // create title 
      const h2 = document.createElement( 'h2' );
      h2.textContent = name();

      // create link for to go photographer page
      const a = document.createElement( 'a' );
      a.setAttribute("href", url);
      a.appendChild(img);
      a.appendChild(h2);

      // create paragraphe for city / country
      const location = document.createElement( 'p' );
      location.textContent = city +", "+ country;
      location.classList.add("location");
      
      // create paragraphe for tagline
      const taglinePar = document.createElement( 'p' );
      taglinePar.textContent = tagline;
      taglinePar.classList.add("tagline");


      // create paragraphe for price
      const pricePar = document.createElement( 'p' );
      pricePar.textContent = price +"€/jour";
      pricePar.classList.add("price");
      
      // create div for static text (city, country, tagline, price)
      const div = document.createElement( 'div' );
      div.appendChild(location);
      div.appendChild(taglinePar);
      div.appendChild(pricePar);

      // create article
      article.appendChild(a);
      article.appendChild(div);

      return (article);
  }

  return {
    renderRecipeCardDOM
  }
}