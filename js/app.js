import { recipes } from "./data/recipes.js";
import {
  INGREDIENTSSORTING,
  APPLIANCESSORTING,
  USTENSILSSORTING,
} from "./dropdown.js";
import { searchConstructor, CreateArticle } from "./pageCreation.js";

const SECTION = document.getElementById("searchSection");
const ARTICLE = document.getElementById("recipesList");

// Création de la partie recherche grâce à l'appel de la fonction searchConstructor
searchConstructor(
  SECTION,
  INGREDIENTSSORTING,
  APPLIANCESSORTING,
  USTENSILSSORTING
);

// Création de la partie article à l'aide d'une boucle et d'une nouvelle instance de CreateArticle
recipes.forEach((recipe) => {
  let article = new CreateArticle(recipe);
  article.articleConstructor(ARTICLE);
});

const APPAREIL = document.querySelector(".appareil");
const USTENSILE = document.querySelector(".ustensile");
const BUTTONS = document.querySelectorAll(".dropdown");

const DROPDOWNINGREDIENTS = document.querySelector(".ingredient__search");
const DROPDOWNAPPAREILS = document.querySelector(".appareil__search");
const DROPDOWNUSTENSILES = document.querySelector(".ustensile__search");

const LIITEMS = document.querySelectorAll(".li");
const TAGINGREDIENT = document.querySelector(".tagSearch__ingredient");
const TAGAPPAREIL = document.querySelector(".tagSearch__appareil");
const TAGUSTENSILE = document.querySelector(".tagSearch__ustensile");
const TAGS = [TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE];

const SEARCHINPUT = document.getElementById("searchInput");

// console.log(DROPDOWNUSTENSILES);

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

// permet de disposer les tags de recherche en cliquant dessus
LIITEMS.forEach((liItem) => {
  liItem.addEventListener("click", function (e) {
    console.log(e.target);
    if (e.target.classList.contains("ingredientItems")) {
      TAGINGREDIENT.innerHTML = `
      ${e.target.textContent} 
      `;
      TAGINGREDIENT.classList.remove("tagSearch__ingredient__hidde");
    } else if (e.target.classList.contains("appareilItems")) {
      TAGAPPAREIL.innerHTML = `
      ${e.target.textContent} 
      `;
      TAGAPPAREIL.classList.remove("tagSearch__appareil__hidde");
    } else {
      TAGUSTENSILE.innerHTML = `
      ${e.target.textContent} 
      `;
      TAGUSTENSILE.classList.remove("tagSearch__ustensile__hidde");
    }
  });
});

TAGS.forEach((tag) => {
  tag.addEventListener("click", function (e) {
    if (e.target.classList.contains("tagSearch__ingredient")) {
      tag.classList.add("tagSearch__ingredient__hidde");
    } else if (e.target.classList.contains("tagSearch__appareil")) {
      tag.classList.add("tagSearch__appareil__hidde");
    } else {
      tag.classList.add("tagSearch__ustensile__hidde");
    }
  });
});

SEARCHINPUT.addEventListener("keyup", function (e) {
  let newRecipes = recipes;
  let recipeSearch = e.target.value.toLowerCase();
  let result = search(newRecipes, recipeSearch);
  // variable pour le second algo
  // let secondResult = secondSearch(recipes, recipeSearch);

  console.log(secondResult);
  if (recipeSearch.length > 2) {
    ARTICLE.innerHTML = "";
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
function secondSearch(tableau, recherche) {
  let newResults = [];
  tableau.forEach((recipe) => {
    if (
      recipe.description.includes(recherche) ||
      recipe.name.toLowerCase().includes(recherche) ||
      recipe.ustensils.includes(recherche) ||
      recipe.appliance.toLowerCase().includes(recherche)
    ) {
      newResults.push(recipe);
    }
    // console.log(newResults);
  });
  return newResults;
}
