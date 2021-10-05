import { recipes } from "./data/recipes.js";
import {
  ingredientsTrie,
  appliancesTrie,
  ustensilesTrie,
  getAllItems,
} from "./data-sorting.js";
import { CreateArticle, LiConstructor } from "./pageCreation.js";
import { Search, searchItem } from "./search.js";
import { openList, closeList } from "./dropdown.js";
// import { positionTag, closeTag } from "./tags.js";

const ARTICLE = document.getElementById("recipesList");

// Variable qui va stocker si une recherche a été faite ou non
let primeSearch = false;

// Variable qui va stocker les valeurs des différents tags affiché afin de permettre de faire une recherche croisé
let arrayTags = [];
// Variables qui vont stocker les tags des différents items
let tagsIngredients = [];
let tagsAppareils = [];
let tagsUstensiles = [];

let firstLi = new LiConstructor(
  ingredientsTrie,
  appliancesTrie,
  ustensilesTrie
);

firstLi.liCreator();

// Création de la partie article à l'aide d'une boucle et d'une nouvelle instance de CreateArticle
recipes.forEach((recipe) => {
  let article = new CreateArticle(recipe);
  article.articleConstructor(ARTICLE);
});

const SEARCHINPUT = document.getElementById("searchInput");

// Evenement qui écoute l'entrée de la recherche principal et refait le DOM en conséquence
SEARCHINPUT.addEventListener("keyup", function (e) {
  console.log(e.target.value);
  let test = new Search(recipes, e.target.value).mainSearch();
  console.log(test);
  if (e.target.value.length > 2) {
    ARTICLE.innerHTML = "";
    if (test.length == 0) {
      ARTICLE.innerHTML = `
      <span class="searchError">Aucune recette ne correspond à votre critère... Vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>
      `;
    }
    primeSearch = test;
    console.log(primeSearch);
    test.forEach((recipe) => {
      let article = new CreateArticle(recipe);
      article.articleConstructor(ARTICLE);
    });
    getAllItems(test);
    let newLi = new LiConstructor(
      ingredientsTrie,
      appliancesTrie,
      ustensilesTrie
    );
    newLi.liCreator();
    lis = document.querySelectorAll(".li");
    positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
  } else {
    ARTICLE.innerHTML = "";
    primeSearch = false;
    recipes.forEach((recipe) => {
      let article = new CreateArticle(recipe);
      article.articleConstructor(ARTICLE);
    });
    getAllItems(recipes);
    let newLi = new LiConstructor(
      ingredientsTrie,
      appliancesTrie,
      ustensilesTrie
    );
    newLi.liCreator();
    lis = document.querySelectorAll(".li");
    positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
  }
});

const APPAREIL = document.querySelector(".appareil");
const USTENSILE = document.querySelector(".ustensile");
const BUTTONS = document.querySelectorAll(".dropdown");

// Récupère les menus cachés dérrière les boutonts des différents items
const DROPDOWNINGREDIENTS = document.querySelector(".ingredient__search");
const DROPDOWNAPPAREILS = document.querySelector(".appareil__search");
const DROPDOWNUSTENSILES = document.querySelector(".ustensile__search");

// Constantes qui récup les éléments du DOM où seront affichés les tags
const TAGINGREDIENT = document.querySelector(".tagSearch__ingredient");
const TAGAPPAREIL = document.querySelector(".tagSearch__appareil");
const TAGUSTENSILE = document.querySelector(".tagSearch__ustensile");
const TAGS = [TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE];

let lis = [];

let INPUTSDROPDOWN = document.querySelectorAll(".input");
const CONTAINERSEARCH = document.querySelector(".container");

document.addEventListener("click", function (e) {
  closeList(e, BUTTONS);
});

openList(
  DROPDOWNINGREDIENTS,
  DROPDOWNAPPAREILS,
  DROPDOWNUSTENSILES,
  APPAREIL,
  USTENSILE
);

// permet de disposer les tags de recherche en cliquant dessus
function positionTag(lis, tagIngre, tagApp, tagUst) {
  lis.forEach((li) => {
    li.addEventListener("click", function (e) {
      if (!arrayTags.includes(e.target.dataset.value)) {
        arrayTags.push(e.target.dataset.value);
        console.log(arrayTags);
        if (e.target.classList.contains("ingredientItems")) {
          tagIngre.innerHTML += `
              <span class="tagSearch__ingredient__position">${e.target.textContent}</span>
              `;
          searchByTag(e.target.dataset.value);
          closeTag();
        }
        if (e.target.classList.contains("appareilItems")) {
          tagApp.innerHTML += `
              <span class="tagSearch__appareil__position">${e.target.textContent}</span>
              `;
          searchByTag(e.target.dataset.value);
          closeTag();
        }
        if (e.target.classList.contains("ustensileItems")) {
          tagUst.innerHTML += `
              <span class="tagSearch__ustensile__position">${e.target.textContent}</span>
              `;
          searchByTag(e.target.dataset.value);
          closeTag();
        }
      } else {
        let removeTag = arrayTags.indexOf(e.target.dataset.value);
        arrayTags.splice(removeTag);
        searchAfterRemoveTag();
        if (e.target.classList.contains("ingredientItems")) {
          let tagIngre = document.querySelector(".tagSearch__ingredient");
          let tagsIn = document.querySelectorAll(
            ".tagSearch__ingredient__position"
          );
          tagsIn.forEach((tag) => {
            if (tag.textContent == e.target.textContent) {
              tagIngre.removeChild(tag);
            }
          });
        }
        if (e.target.classList.contains("appareilItems")) {
          let tagApp = document.querySelector(".tagSearch__appareil");
          let tagsIn = document.querySelectorAll(
            ".tagSearch__appareil__position"
          );
          tagsIn.forEach((tag) => {
            if (tag.textContent == e.target.textContent) {
              tagApp.removeChild(tag);
            }
          });
        }
        if (e.target.classList.contains("ustensileItems")) {
          let tagUst = document.querySelector(".tagSearch__ustensile");
          let tagsIn = document.querySelectorAll(
            ".tagSearch__ustensile__position"
          );
          tagsIn.forEach((tag) => {
            if (tag.textContent == e.target.textContent) {
              tagUst.removeChild(tag);
            }
          });
        }
      }
    });
  });
}

function closeTag() {
  let spanTags = document.querySelectorAll(".tagSearch span");
  spanTags.forEach((span) => {
    span.addEventListener("click", function (e) {
      console.log(arrayTags);
      let removeTag = arrayTags.indexOf(e.target.textContent);
      console.log(removeTag);
      arrayTags.splice(removeTag);
      console.log(arrayTags);

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
      searchAfterRemoveTag();
    });
  });
}

positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
closeTag();

// Evenement qui écoute les entrées des différents items et les affiche au fur et à mesure
INPUTSDROPDOWN.forEach((input) => {
  lis = document.querySelectorAll(".li");
  positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
  input.addEventListener("keyup", function (e) {
    if (!primeSearch) {
      getAllItems(recipes);
      let ingredientsSorting = searchItem(ingredientsTrie, e.target.value);
      let appliancesSorting = searchItem(appliancesTrie, e.target.value);
      let ustensilssSorting = searchItem(ustensilesTrie, e.target.value);
      if (e.target.classList.contains("ingredient__search__input")) {
        let li = new LiConstructor(
          ingredientsSorting,
          appliancesSorting,
          ustensilssSorting
        ).ingredientCreator();
        lis = document.querySelectorAll(".li");
        positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
      }
      if (e.target.classList.contains("appareil__search__input")) {
        let li = new LiConstructor(
          ingredientsSorting,
          appliancesSorting,
          ustensilssSorting
        ).appareilCreator();
        lis = document.querySelectorAll(".li");
        positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
      }
      if (e.target.classList.contains("ustensile__search__input")) {
        let li = new LiConstructor(
          ingredientsSorting,
          appliancesSorting,
          ustensilssSorting
        ).ustensileCreator();
        lis = document.querySelectorAll(".li");
        positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
      }
    } else {
      console.log(primeSearch);
      getAllItems(primeSearch);
      let ingredientsSorting = searchItem(ingredientsTrie, e.target.value);
      console.log(ingredientsSorting);
      let appliancesSorting = searchItem(appliancesTrie, e.target.value);
      let ustensilssSorting = searchItem(ustensilesTrie, e.target.value);
      if (e.target.classList.contains("ingredient__search__input")) {
        let li = new LiConstructor(
          ingredientsSorting,
          appliancesSorting,
          ustensilssSorting
        ).ingredientCreator();
        lis = document.querySelectorAll(".li");
        positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
      }
      if (e.target.classList.contains("appareil__search__input")) {
        let li = new LiConstructor(
          ingredientsSorting,
          appliancesSorting,
          ustensilssSorting
        ).appareilCreator();
        lis = document.querySelectorAll(".li");
        positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
      }
      if (e.target.classList.contains("ustensile__search__input")) {
        let li = new LiConstructor(
          ingredientsSorting,
          appliancesSorting,
          ustensilssSorting
        ).ustensileCreator();
        lis = document.querySelectorAll(".li");
        positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
      }
    }
  });
});

function searchByTag(elementClicked) {
  if (!primeSearch && arrayTags.length == 0) {
    let test = new Search(recipes, elementClicked).itemSearch();
    console.log(test);
    domAfterSearch(test, lis);
  } else if (!primeSearch && arrayTags.length > 0) {
    console.log(arrayTags);
    let test = new Search(recipes, arrayTags).itemSearch();
    console.log(test);
    domAfterSearch(test, lis);
  } else if (primeSearch && arrayTags.length > 0) {
    let test = new Search(primeSearch, elementClicked).itemSearch();
    console.log(test);
    domAfterSearch(test, lis);
  }
}

function searchAfterRemoveTag() {
  if (!primeSearch && arrayTags.length == 0) {
    let test = recipes;
    console.log(test);
    domAfterSearch(test, lis);
  } else if (!primeSearch && arrayTags.length > 0) {
    let test = new Search(recipes, arrayTags).itemSearch();
    console.log(test);
    domAfterSearch(test, lis);
  } else if (primeSearch && arrayTags.length > 0) {
    let test = new Search(primeSearch, arrayTags).itemSearch();
    console.log(test);
    domAfterSearch(test, lis);
  } else if (primeSearch && arrayTags == 0) {
    let test = primeSearch;
    console.log(test);
    domAfterSearch(test, lis);
  }
}

function domAfterSearch(test, lis) {
  ARTICLE.innerHTML = "";
  test.forEach((recipe) => {
    let article = new CreateArticle(recipe);
    article.articleConstructor(ARTICLE);
  });
  getAllItems(test);
  let newLi = new LiConstructor(
    ingredientsTrie,
    appliancesTrie,
    ustensilesTrie
  );
  newLi.liCreator();
  lis = document.querySelectorAll(".li");
  positionTag(lis, TAGINGREDIENT, TAGAPPAREIL, TAGUSTENSILE);
}
