import { recipes } from "./data/recipes.js";

// let allIngredients = [];
// let allAppliances = [];
// let allUstensils = [];

// // fonction qui récupère tout les ingrédients compris dans les recettes
// function getAllIngredients() {
//   recipes.forEach((recipe) => {
//     recipe.ingredients.forEach((ingredient) => {
//       allIngredients.push(ingredient.ingredient);
//     });
//   });
// }

// function getAllAppliance() {
//   recipes.forEach((recipe) => {
//     allAppliances.push(recipe.appliance);
//   });
// }

// function getAllUstensils() {
//   recipes.forEach((recipe) => {
//     recipe.ustensils.forEach((ustensil) => {
//       allUstensils.push(ustensil);
//     });
//   });
// }

// getAllIngredients();
// getAllUstensils();
// getAllAppliance();

// // Tri des ingrédients pour qu'il n'y ai pas de double
// const INGREDIENTSSORTING = allIngredients.filter(function (ele, pos) {
//   return allIngredients.indexOf(ele) == pos;
// });

// const APPLIANCESSORTING = allAppliances.filter(function (ele, pos) {
//   return allAppliances.indexOf(ele) == pos;
// });

// const USTENSILSSORTING = allUstensils.filter(function (ele, pos) {
//   return allUstensils.indexOf(ele) == pos;
// });

let ingredientsTrie = [];
let appliancesTrie = [];
let ustensilesTrie = [];

const getAllIngredient = function (recipes) {
  let allIngredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.push(ingredient.ingredient);
    });
  });
  ingredientsTrie = allIngredients.filter(function (ele, pos) {
    return allIngredients.indexOf(ele) == pos;
  });
};

const getAllAppliances = function (recipes) {
  let allAppliances = [];
  recipes.forEach((recipe) => {
    allAppliances.push(recipe.appliance);
  });
  appliancesTrie = allAppliances.filter(function (ele, pos) {
    return allAppliances.indexOf(ele) == pos;
  });
};

const getAllUstensile = function (recipes) {
  let allUstensils = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      allUstensils.push(ustensil);
    });
  });
  ustensilesTrie = allUstensils.filter(function (ele, pos) {
    return allUstensils.indexOf(ele) == pos;
  });
};

getAllIngredient(recipes);
getAllAppliances(recipes);
getAllUstensile(recipes);

// class Dropdown {
//   static initialisation() {
//     // Récupère les inputs des dropdown
//     let liens = document.querySelectorAll(".input");

//     liens.forEach((lien) => {
//       lien.addEventListener("click", function (e) {
//         console.log(e.target);
//       });
//     });
//   }

//   constructor(recipes) {
//     this.ingredients = recipes.ingredients;
//     this.appliance = recipes.appliance;
//     this.ustensils = recipes.ustensils;
//   }

//   liMaker() {}
// }

export {
  ingredientsTrie,
  appliancesTrie,
  ustensilesTrie,
  getAllIngredient,
  getAllAppliances,
  getAllUstensile,
};
