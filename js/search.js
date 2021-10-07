class Search {
  constructor(liste, recherche) {
    this.liste = liste;
    this.recherche = recherche;
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

  mainSearch() {
    let nouvelleRecettes = this.liste;
    let newRecipes = [];
    nouvelleRecettes.forEach((nouvelleRecette) => {
      const name = this.replace(nouvelleRecette.name);
      const appliance = this.replace(nouvelleRecette.appliance);
      const description = this.replace(nouvelleRecette.description);
      const ustensils = nouvelleRecette.ustensils;
      const ingredients = nouvelleRecette.ingredients;
      if (
        name.includes(this.recherche) ||
        appliance.includes(this.recherche) ||
        description.includes(this.recherche)
      ) {
        newRecipes.push(nouvelleRecette);
      }
      ustensils.forEach((ustensil) => {
        const ust = this.replace(ustensil);
        if (ust.includes(this.recherche)) {
          newRecipes.push(nouvelleRecette);
        }
      });
      ingredients.forEach((ingredient) => {
        const ingre = this.replace(ingredient.ingredient);
        if (ingre.includes(this.recherche)) {
          newRecipes.push(nouvelleRecette);
        }
      });
    });
    let newRecipesSorting = Array.from(new Set(newRecipes));
    console.log(newRecipesSorting);

    return newRecipesSorting;
  }

  itemSearch = function () {
    let nouvelleRecettes = this.liste;
    let newRecipes = [];
    nouvelleRecettes.forEach((nouvelleRecette) => {
      let listeItemToTest = [];
      nouvelleRecette.ingredients.forEach((ingredient) => {
        listeItemToTest.push(this.replace(ingredient.ingredient));
      });
      listeItemToTest.push(this.replace(nouvelleRecette.appliance));
      nouvelleRecette.ustensils.forEach((ustensil) => {
        listeItemToTest.push(this.replace(ustensil));
      });
      if (typeof this.recherche === "string") {
        if (listeItemToTest.includes(this.recherche)) {
          newRecipes.push(nouvelleRecette);
        }
      } else {
        let varToTest = [];
        this.recherche.forEach((element) => {
          if (listeItemToTest.includes(element)) {
            varToTest.push(true);
          } else {
            varToTest.push(false);
          }
        });
        if (varToTest.every((test) => test === true)) {
          newRecipes.push(nouvelleRecette);
        }
      }
    });
    let newRecipesSorting = Array.from(new Set(newRecipes));
    console.log(newRecipesSorting);
    return newRecipesSorting;
  };
}

function searchItem(tableau, recherche) {
  return tableau.filter((element) =>
    element
      .toLowerCase()
      .replace(/[àäâ]/g, "a")
      .replace(/[ç]/g, "c")
      .replace(/[éèêë]/g, "e")
      .replace(/[îï]/g, "i")
      .replace(/[ôö]/g, "o")
      .replace(/[ùûû]/g, "u")
      .includes(recherche)
  );
}

export { Search, searchItem };
