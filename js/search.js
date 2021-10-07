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
    const result = nouvelleRecettes.filter((nouvelleRecette) => {
      return (
        nouvelleRecette.ingredients.filter((ingredient) => {
          return this.replace(ingredient.ingredient).includes(
            this.replace(this.recherche)
          );
        }).length !== 0 ||
        this.replace(nouvelleRecette.name).includes(
          this.replace(this.recherche)
        ) ||
        this.replace(this.recherche)
          .split(" ")
          .filter(
            (word) =>
              this.replace(nouvelleRecette.description).includes(word) === false
          ).length === 0 ||
        nouvelleRecette.ustensils.filter((ustensil) => {
          return this.replace(ustensil).includes(this.replace(this.recherche));
        }).length !== 0
      );
    });
    return result;
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
