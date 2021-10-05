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
      let testIngre = false;
      let testApp = false;
      let testUst = false;
      nouvelleRecette.ingredients.forEach((ingredient) => {
        this.recherche.forEach((search) => {
          if (ingredient.ingredient.includes(search)) {
            testIngre = true;
          }
        });
      });
      this.recherche.forEach((search) => {
        if (nouvelleRecette.appliance.includes(search)) {
          testApp = true;
        }
      });
      nouvelleRecette.ustensils.forEach((ustensil) => {
        this.recherche.forEach((search) => {
          if (ustensil.includes(search)) {
            testUst = true;
          }
        });
      });
      if (testIngre && !(testApp && testUst)) {
        newRecipes.push(nouvelleRecette);
      } else if (testIngre && testApp && !testUst) {
        newRecipes.push(nouvelleRecette);
      } else if (testIngre && !testApp && testUst) {
        newRecipes.push(nouvelleRecette);
      } else if (testIngre && testApp && testUst) {
        newRecipes.push(nouvelleRecette);
      } else if (!testIngre && testApp && !testUst) {
        newRecipes.push(nouvelleRecette);
      } else if (!testIngre && testApp && testUst) {
        newRecipes.push(nouvelleRecette);
      } else if (!testIngre && !testApp && testUst) {
        newRecipes.push(nouvelleRecette);
      } else if (testIngre && !testApp && testUst) {
        newRecipes.push(nouvelleRecette);
      } else {
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
