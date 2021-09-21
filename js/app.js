import { recipes } from "./data/recipes.js";
import {
  ingredientsTrie,
  appliancesTrie,
  ustensilesTrie,
  getAllItems,
  ingredientsTrieLowerCase,
} from "./dropdown.js";
import { searchConstructor, CreateArticle } from "./pageCreation.js";

const SECTION = document.getElementById("searchSection");
const ARTICLE = document.getElementById("recipesList");
const description = [];
const name = [];
recipes.forEach((recipe) => {
  description.push(recipe.description.toLowerCase());
  name.push(recipe.name.toLowerCase());
});

let newObjectRecipes = [
  { description: description },
  { name: name },
  { ustensils: ustensilesTrie },
  { appliance: appliancesTrie },
  { ingredients: ingredientsTrie },
];
console.log(newObjectRecipes);

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

// Récupère les menus cachés dérrière les boutonts des différents items
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

const SEARCHINPUT = document.getElementById("searchInput");
let INPUTSDROPDOWN = document.querySelectorAll(".input");
const CONTAINERSEARCH = document.querySelector(".container");

let arrayTags = [];

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
      element.description.toLowerCase().includes(recherche) ||
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

//Fonction qui fait les li lors de la recherche principale
function liCreatorMainSearch(
  domIngredient,
  domAppareil,
  domUstensile,
  ingredients,
  appareils,
  ustensiles
) {
  domIngredient.innerHTML = `
        ${ingredients
          .map(
            (ingredient) => `<li class="ingredientItems li">${ingredient}</li>`
          )
          .join("")}
      `;
  domAppareil.innerHTML = `
        ${appareils
          .map((appareil) => `<li class="appareilItems li">${appareil}</li>`)
          .join("")}
      `;
  domUstensile.innerHTML = `
        ${ustensiles
          .map((ustensile) => `<li class="ustensileItems li">${ustensile}</li>`)
          .join("")}
      `;
}

// Permet de faire la recherche dans l'onglet de recherche principal
SEARCHINPUT.addEventListener("keyup", function (e) {
  let newRecipes = recipes;
  console.log(newRecipes);
  let recipeSearch = e.target.value.toLowerCase();
  console.log(recipeSearch);
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
    result.forEach((recipe) => {
      let article = new CreateArticle(recipe);
      article.articleConstructor(ARTICLE);
      getAllItems(result);
      liCreatorMainSearch(
        ulIngredient,
        ulAppareil,
        ulUstensile,
        ingredientsTrie,
        appliancesTrie,
        ustensilesTrie
      );
      positionTag();
    });
  } else {
    ARTICLE.innerHTML = "";
    recipes.forEach((recipe) => {
      let article = new CreateArticle(recipe);
      article.articleConstructor(ARTICLE);
      getAllItems(result);
      liCreatorMainSearch(
        ulIngredient,
        ulAppareil,
        ulUstensile,
        ingredientsTrie,
        appliancesTrie,
        ustensilesTrie
      );
      positionTag();
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
      positionTag();
    }
    if (e.target.classList.contains("appareil__search__input")) {
      searchItem(appliancesSorting, e.target.value.toLowerCase());
      liMaker(e.target, ulAppareil, appliancesSorting);
      positionTag();
    }
    if (e.target.classList.contains("ustensile__search__input")) {
      searchItem(ustensilesSorting, e.target.value.toLowerCase());
      liMaker(e.target, ulUstensile, ustensilesSorting);
      positionTag();
    }
  });
});

// Fonction qui fait les li lors d'une recherche dans les différents items
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

// permet de disposer les tags de recherche en cliquant dessus
function positionTag() {
  let lis = document.querySelectorAll(".li");
  lis.forEach((li) => {
    li.addEventListener("click", function (e) {
      arrayTags.push(e.target.textContent);
      console.log(arrayTags);
      if (e.target.classList.contains("ingredientItems")) {
        TAGINGREDIENT.innerHTML += `
        <span class="tagSearch__ingredient__position">${e.target.textContent}</span>
        `;
        tagsRecipesSorting(e.target);
        closeTag();
      }
      if (e.target.classList.contains("appareilItems")) {
        TAGAPPAREIL.innerHTML += `
        <span class="tagSearch__appareil__position">${e.target.textContent}</span>
        `;
        tagsRecipesSorting(e.target);
        closeTag();
      }
      if (e.target.classList.contains("ustensileItems")) {
        TAGUSTENSILE.innerHTML += `
        <span class="tagSearch__ustensile__position">${e.target.textContent}</span>
        `;
        tagsRecipesSorting(e.target);
        closeTag();
      }
    });
  });
}

// Permet de fermer les tags en cliquant dessus
function closeTag() {
  let spanTags = document.querySelectorAll(".tagSearch span");
  let filtreArrayTags = arrayTags;
  console.log(filtreArrayTags);
  spanTags.forEach((spanTag) => {
    spanTag.addEventListener("click", function (e) {
      console.log(e.target);
      if (e.target.classList.contains("tagSearch__ingredient__position")) {
        document.querySelector(".tagSearch__ingredient").removeChild(e.target);
      } else if (e.target.classList.contains("tagSearch__appareil__position")) {
        document.querySelector(".tagSearch__appareil").removeChild(e.target);
      } else if (
        e.target.classList.contains("tagSearch__ustensile__position")
      ) {
        document.querySelector(".tagSearch__ustensile").removeChild(e.target);
      } else {
      }
      tagSearchSorting(filtreArrayTags, e.target.textContent);
      let filtreArrayString = filtreArrayTags.toString().toLowerCase();
      console.log(filtreArrayString);
      let result = search(recipes, filtreArrayString);
      ARTICLE.innerHTML = "";
      result.forEach((recipe) => {
        let article = new CreateArticle(recipe);
        article.articleConstructor(ARTICLE);
        getAllItems(result);
        liCreatorMainSearch(
          ulIngredient,
          ulAppareil,
          ulUstensile,
          ingredientsTrie,
          appliancesTrie,
          ustensilesTrie
        );
        positionTag();
      });
    });
  });
}

positionTag();

function tagsRecipesSorting(elementClicked) {
  let result = search(recipes, elementClicked.textContent.toLowerCase());
  console.log(result);
  ARTICLE.innerHTML = "";
  result.forEach((recipe) => {
    let article = new CreateArticle(recipe);
    article.articleConstructor(ARTICLE);
    getAllItems(result);
    liCreatorMainSearch(
      ulIngredient,
      ulAppareil,
      ulUstensile,
      ingredientsTrie,
      appliancesTrie,
      ustensilesTrie
    );
    positionTag();
  });
}

function tagSearchSorting(tableau, recherche) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i] == recherche) {
      tableau.splice(i, 1);
    }
  }
}

function removeAccent(string) {
  string.replace(/[éèêë]/g, "e").replace(/[àäâ]/g, "a");
}
