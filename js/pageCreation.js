class LiConstructor {
  constructor(ingredients, appliances, ustensils) {
    this.ingredients = ingredients;
    this.appliances = appliances;
    this.ustensils = ustensils;
  }

  replace = function (element) {
    return element
      .toLowerCase()
      .replace(/[àäâ]/g, "a")
      .replace(/[ç]/g, "c")
      .replace(/[éèêë]/g, "e")
      .replace(/[îï]/g, "i")
      .replace(/[ôö]/g, "o")
      .replace(/[ùûû]/g, "u");
  };

  ingredientCreator() {
    const ulIngredient = document.querySelector(".ingredient__search__menu");
    return (ulIngredient.innerHTML = `
      ${this.ingredients
        .map(
          (ingredient) =>
            `<li class="ingredientItems li" data-value="${this.replace(
              ingredient
            )}">${ingredient}</li>`
        )
        .join("")}
      `);
  }

  appareilCreator() {
    const ulAppareil = document.querySelector(".appareil__search__menu");
    return (ulAppareil.innerHTML = `
         ${this.appliances
           .map(
             (appliance) =>
               `<li class="appareilItems li" data-value="${this.replace(
                 appliance
               )}">${appliance}</li>`
           )
           .join("")}
        `);
  }

  ustensileCreator() {
    const ulUstensile = document.querySelector(".ustensile__search__menu");
    return (ulUstensile.innerHTML = `
        ${this.ustensils
          .map(
            (ustensile) =>
              `<li class="ustensileItems li" data-value="${this.replace(
                ustensile
              )}">${ustensile}</li>`
          )
          .join("")}
      `);
  }

  liCreator() {
    return (
      this.ingredientCreator(), this.appareilCreator(), this.ustensileCreator()
    );
  }
}

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

export { CreateArticle, LiConstructor };
