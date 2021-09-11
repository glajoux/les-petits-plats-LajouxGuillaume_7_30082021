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
console.log(BUTTONS);

const DROPDOWNINGREDIENTS = document.querySelector(".ingredient__search");
const DROPDOWNAPPAREILS = document.querySelector(".appareil__search");
const DROPDOWNUSTENSILES = document.querySelector(".ustensile__search");

// console.log(DROPDOWNUSTENSILES);

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

document.addEventListener("click", function (e) {
  console.log(e.target);
  if (
    e.target.classList.contains("fleche") ||
    (!e.target.classList.contains("li") &&
      !e.target.classList.contains("input"))
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
