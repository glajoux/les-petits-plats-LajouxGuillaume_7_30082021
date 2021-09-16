import { recipes } from "./data/recipes.js";
import {
  ingredientsTrie,
  appliancesTrie,
  ustensilesTrie,
  getAllIngredient,
  getAllAppliances,
  getAllUstensile,
} from "./dropdown.js";
import { searchConstructor, CreateArticle } from "./pageCreation.js";

const SECTION = document.getElementById("searchSection");
const ARTICLE = document.getElementById("recipesList");

// Création de la partie recherche grâce à l'appel de la fonction searchConstructor
searchConstructor(SECTION, ingredientsTrie, appliancesTrie, ustensilesTrie);

// Création de la partie article à l'aide d'une boucle et d'une nouvelle instance de CreateArticle
recipes.forEach((recipe) => {
  let article = new CreateArticle(recipe);
  article.articleConstructor(ARTICLE);
});

const APPAREIL = document.querySelector(".appareil");
const USTENSILE = document.querySelector(".ustensile");
const BUTTONS = document.querySelectorAll(".dropdown");

// Récupère les menus cachés dérrière les bouonts des différents items
const DROPDOWNINGREDIENTS = document.querySelector(".ingredient__search");
const DROPDOWNAPPAREILS = document.querySelector(".appareil__search");
const DROPDOWNUSTENSILES = document.querySelector(".ustensile__search");

// Constantes qui récup les éléments du DOM ou seront affiché les tags
const TAGINGREDIENT = document.querySelector(".tagSearch__ingredient");
const TAGAPPAREIL = document.querySelector(".tagSearch__appareil");
const TAGUSTENSILE = document.querySelector(".tagSearch__ustensile");
const TAGS = [TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE];

let ulIngredient = document.querySelector(".ingredient__search__menu");
let ulAppareil = document.querySelector(".appareil__search__menu");
let ulUstensile = document.querySelector(".ustensile__search__menu");

console.log(ulAppareil, ulUstensile);

const SEARCHINPUT = document.getElementById("searchInput");
let INPUTSDROPDOWN = document.querySelectorAll(".input");
const CONTAINERSEARCH = document.querySelector(".container");

// constante qui permet d'ouvrir les menus déroulant
const openList = function () {
  document.addEventListener("click", function (e) {
    let cible = e.target;
    if (
      cible.id === "dropdownMenuIngredient" ||
      cible.id === "dropdownMenuUstensile" ||
      cible.id === "dropdownMenuAppareil"
    ) {
      if (cible.classList.contains("ingredient__button")) {
        DROPDOWNINGREDIENTS.classList.remove("hidde");
        APPAREIL.classList.add("move");
        USTENSILE.classList.add("move");
      }
      if (cible.classList.contains("appareil__button")) {
        DROPDOWNAPPAREILS.classList.remove("hidde");
        USTENSILE.classList.add("move");
      }
      if (cible.classList.contains("ustensile__button")) {
        DROPDOWNUSTENSILES.classList.remove("hidde");
      }
    }
    if (cible.classList.contains("flecheOpen")) {
      if (cible.classList.contains("flecheIngredient")) {
        DROPDOWNINGREDIENTS.classList.remove("hidde");
        APPAREIL.classList.add("move");
        USTENSILE.classList.add("move");
      }
      if (cible.classList.contains("flecheAppareil")) {
        DROPDOWNAPPAREILS.classList.remove("hidde");
        USTENSILE.classList.add("move");
      }
      if (cible.classList.contains("flecheUstensile")) {
        DROPDOWNUSTENSILES.classList.remove("hidde");
      }
    }
  });
};

// permet de fermer les menus déroulant
document.addEventListener("click", function (e) {
  console.log(e.target);
  if (
    e.target.classList.contains("fleche") ||
    !e.target.classList.contains("input")
  ) {
    document.querySelectorAll(".boutons").forEach((bouton) => {
      if (!bouton.classList.contains("hidde")) {
        bouton.classList.add("hidde");
        BUTTONS.forEach((button) => {
          button.classList.remove("move");
        });
      }
    });
  }
});

openList();

// Premier algorithme des recherche
function search(list, recherche) {
  return list.filter(
    (element) =>
      element.description.includes(recherche) ||
      element.name.toLowerCase().includes(recherche) ||
      element.ustensils.includes(recherche) ||
      element.appliance.toLowerCase().includes(recherche)
  );
}

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

// Permet de faire la recherche dans l'onglet de recherche principal
SEARCHINPUT.addEventListener("keyup", function (e) {
  let newRecipes = recipes;
  let recipeSearch = e.target.value.toLowerCase();
  let result = search(newRecipes, recipeSearch);
  // variable pour le second algo
  // let secondResult = secondSearch(recipes, recipeSearch);
  // console.log(secondResult);
  if (recipeSearch.length > 2) {
    // CONTAINERSEARCH.innerHTML = "";
    ARTICLE.innerHTML = "";
    if (result.length == 0) {
      ARTICLE.innerHTML = `
      <span class="searchError">Aucune recette ne correspond à votre critère... Vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>
      `;
    }
    // getAllIngredient(result);
    // getAllAppliances(result);
    // getAllUstensile(result);
    // console.log(ingredientsTrie);
    // searchConstructor(
    //   CONTAINERSEARCH,
    //   ingredientsTrie,
    //   appliancesTrie,
    //   ustensilesTrie
    // );
    result.forEach((recipe) => {
      let article = new CreateArticle(recipe);
      article.articleConstructor(ARTICLE);
    });
  } else {
    ARTICLE.innerHTML = "";
    recipes.forEach((recipe) => {
      let article = new CreateArticle(recipe);
      article.articleConstructor(ARTICLE);
    });
  }

  // lgogique pour le second algo
  // if (recipeSearch.length > 2) {
  //   ARTICLE.innerHTML = "";
  //   secondResult.forEach((recipe) => {
  //     let article = new CreateArticle(recipe);
  //     article.articleConstructor(ARTICLE);
  //   });
  // } else {
  //   ARTICLE.innerHTML = "";
  //   recipes.forEach((recipe) => {
  //     let article = new CreateArticle(recipe);
  //     article.articleConstructor(ARTICLE);
  //   });
  // }
});

function searchItem(tableau, recherche) {
  return tableau.filter((element) => element.toLowerCase().includes(recherche));
}

//Permet de faire une recherche par element et n'affiche que ceux désiré.
INPUTSDROPDOWN.forEach((input) => {
  input.addEventListener("keyup", function (e) {
    let ingredientsSorting = searchItem(
      ingredientsTrie,
      e.target.value.toLowerCase()
    );
    let appliancesSorting = searchItem(
      appliancesTrie,
      e.target.value.toLowerCase()
    );
    let ustensilesSorting = searchItem(
      ustensilesTrie,
      e.target.value.toLowerCase()
    );
    if (e.target.classList.contains("ingredient__search__input")) {
      searchItem(ingredientsSorting, e.target.value.toLowerCase());
      liMaker(e.target, ulIngredient, ingredientsSorting);
    }
    if (e.target.classList.contains("appareil__search__input")) {
      searchItem(appliancesSorting, e.target.value.toLowerCase());
      liMaker(e.target, ulAppareil, appliancesSorting);
    }
    if (e.target.classList.contains("ustensile__search__input")) {
      searchItem(ustensilesSorting, e.target.value.toLowerCase());
      liMaker(e.target, ulUstensile, ustensilesSorting);
    }
  });
});

function liMaker(cible, dom, listes) {
  if (cible.classList.contains("ingredient__search__input")) {
    dom.innerHTML = `
      ${listes
        .map((list) => `<li class="ingredientItems li">${list}</li>`)
        .join("")}
      `;
  }
  if (cible.classList.contains("appareil__search__input")) {
    dom.innerHTML = `
      ${listes
        .map((list) => `<li class="appareilItems li">${list}</li>`)
        .join("")}
      `;
  }
  if (cible.classList.contains("ustensile__search__input")) {
    dom.innerHTML = `
      ${listes
        .map((list) => `<li class="ustensileItems li">${list}</li>`)
        .join("")}
      `;
  }
}

const LIITEMS = document.querySelectorAll(".li");

// permet de disposer les tags de recherche en cliquant dessus
// LIITEMS.forEach((liItem) => {
//   liItem.addEventListener("click", function (e) {
//     console.log(e.target);
//     if (e.target.classList.contains("ingredientItems")) {
//       TAGINGREDIENT.innerHTML += `
//       <span class="tagSearch__ingredient__position">${e.target.textContent}</span>
//       `;
//       TAGINGREDIENT.classList.remove("tagSearch__ingredient__position__hidde");
//     } else if (e.target.classList.contains("appareilItems")) {
//       TAGAPPAREIL.innerHTML = `
//       ${e.target.textContent}
//       `;
//       TAGAPPAREIL.classList.remove("tagSearch__appareil__hidde");
//     } else {
//       TAGUSTENSILE.innerHTML = `
//       ${e.target.textContent}
//       `;
//       TAGUSTENSILE.classList.remove("tagSearch__ustensile__hidde");
//     }
//   });
// });

// let tags = document.querySelectorAll(".tagSearch__ingredient__position");
// console.log(tags);

// // Permet de fermer les tags en cliquant dessus
// TAGS.forEach((tag) => {
//   tag.addEventListener("click", function (e) {
//     if (e.target.classList.contains("tagSearch__ingredient__position")) {
//       tag.classList.add("tagSearch__ingredient__position__hidde");
//     } else if (e.target.classList.contains("tagSearch__appareil")) {
//       tag.classList.add("tagSearch__appareil__hidde");
//     } else {
//       tag.classList.add("tagSearch__ustensile__hidde");
//     }
//   });
// });

async function positionTag() {
  let lis = document.querySelectorAll(".li");
  lis.forEach((li) => {
    li.addEventListener("click", function (e) {
      if (e.target.classList.contains("ingredientItems")) {
        TAGINGREDIENT.innerHTML += `
        <span class="tagSearch__ingredient__position">${e.target.textContent}</span>
        `;
        closeTag();
      }
      if (e.target.classList.contains("appareilItems")) {
        TAGAPPAREIL.innerHTML += `
        <span class="tagSearch__appareil__position">${e.target.textContent}</span>
        `;
        closeTag();
      }
      if (e.target.classList.contains("ustensileItems")) {
        TAGUSTENSILE.innerHTML += `
        <span class="tagSearch__ustensile__position">${e.target.textContent}</span>
        `;
        closeTag();
      }
    });
  });
  console.log(closeTag());
}

function closeTag() {
  let spanTags = document.querySelectorAll(".tagSearch span");
  spanTags.forEach((spanTag) => {
    spanTag.addEventListener("click", function (e) {
      e.target.classList.add("disparait");
    });
  });
}

positionTag();
