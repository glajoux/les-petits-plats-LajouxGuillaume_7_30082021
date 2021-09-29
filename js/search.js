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
<<<<<<< HEAD
        this.replace(this.recherche)
          .split(" ")
          .filter(
            (word) =>
              this.replace(nouvelleRecette.description).includes(word) === false
          ).length === 0 ||
        nouvelleRecette.ustensils.filter((ustensil) => {
          return this.replace(ustensil).includes(this.replace(this.recherche));
        }).length !== 0
=======
        this.replace(nouvelleRecette.description).includes(
          this.replace(this.recherche)
        )
>>>>>>> master
      );
    });
    return result;
  }

  itemSearch = function () {
    return this.liste.filter((element) =>
      this.replace(element).includes(this.recherche)
    );
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

// Second algorithme de recherche
// function secondSearch(tableau, recherche) {
//   let newResults = [];
//   tableau.forEach((recipe) => {
//     if (
//       recipe.description.includes(recherche) ||
//       recipe.name.toLowerCase().includes(recherche) ||
//       recipe.ustensils.includes(recherche) ||
//       recipe.appliance.toLowerCase().includes(recherche)
//     ) {
//       newResults.push(recipe);
//     }
//     // console.log(newResults);
//   });
//   return newResults;
// }
