// Constante qui permet de créer les éléments de recherche sur le DOM
const searchConstructor = function (dom, ingredients, appliances, utils) {
  dom.innerHTML = `
        <div class="searchInput">
          <input
            type="text"
            id="searchInput"
            placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
            class="search"
          />
        </div>
        <div id="tagSearch" class="tagSearch">
          <div class="tagSearch__ingredient"></div>
          <div class="tagSearch__appareil tagSearch__appareil__hidde"></div>
          <div class="tagSearch__ustensile tagSearch__ustensile__hidde"></div>
        </div>

        <div class="container">

          <div class="dropdown dropdown__ingredient ingredient">
            <div class="dropdown__button ingredient__button" role="button" aria-expand="false" id="dropdownMenuIngredient">
              Ingrédients<img src="./images/felche.svg" alt="" class="flecheOpen flecheIngredient"/>
            </div>
            <div class="ingredient__search hidde boutons" aria-labelledby="dropdownMenuIngredient">
              <input type="text" placeholder="Recherche un ingrédient" class="ingredient__search__input input">
              <img src="./images/felche.svg" alt="" class="fleche"/>
              <ul class="ingredient__search__menu">
                ${ingredients
                  .map(
                    (ingredient) =>
                      `<li class="ingredientItems li">${ingredient}</li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>

          <div class="dropdown dropdown__appareil appareil">
            <div class="dropdown__button appareil__button" role="button" aria-expand="false" id="dropdownMenuAppareil">
              Appareil<img src="./images/felche.svg" alt="" class="flecheOpen flecheAppareil"/>
            </div>
            <div class="appareil__search hidde boutons" aria-labelledby="dropdownMenuAppareil">
              <input type="text" placeholder="Recherche un appareil" class="appareil__search__input input">
              <img src="./images/felche.svg" alt="" class="fleche"/>
              <ul class="appareil__search__menu">
                  ${appliances
                    .map(
                      (appliance) =>
                        `<li class="appareilItems li">${appliance}</li>`
                    )
                    .join("")}
                
              </ul>
            </div>
          </div>

          <div class="dropdown dropdown__ustensile ustensile">
            <div class="dropdown__button ustensile__button" role="button" aria-expand="false" id="dropdownMenuUstensile">
              Ustensiles<img src="./images/felche.svg" alt="" class="flecheOpen flecheUstensile"/>
            </div>
            <div class="ustensile__search hidde boutons" aria-labelledby="dropdownMenuUstensile">
              <input type="text" placeholder="Recherche un ustensile" class="ustensile__search__input input">
              <img src="./images/felche.svg" alt="" class="fleche"/>
              <ul class="ustensile__search__menu">
              ${utils
                .map((util) => `<li class="ustensileItems li">${util}</li>`)
                .join("")}
              </ul>
            </div>
          </div>

        </div>    `;
};

// Classe qui permet de faire les vignettes des recettes sur le DOM
class CreateArticle {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;
  }

  articleConstructor = function (dom) {
    dom.innerHTML += `
        <article>
          <div class="visuel"></div>
          <div class="info">
            <div class="entete">
              <h2>${this.name}</h2>
              <div class="temps">
                <img src="./images/timer.svg" alt="" /> ${this.time} min
              </div>
            </div>
            <div class="corps">
              <ul>
                ${this.ingredients
                  .map((ingredient) => {
                    if (!("quantity" in ingredient)) {
                      return `<li><span class="gras">${ingredient.ingredient}</span></li>`;
                    } else if (
                      "quantity" in ingredient &&
                      !("unit" in ingredient)
                    ) {
                      return `<li><span class="gras">${ingredient.ingredient}:</span> ${ingredient.quantity}</li>`;
                    } else {
                      return `<li><span class="gras">${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit}</li>`;
                    }
                  })
                  .join("")}
              </ul>
              <div class="description">
              ${this.description.substring(0, 181)} ...
            </div>
          </div>
        </article>
       `;
  };
}

export { searchConstructor, CreateArticle };
