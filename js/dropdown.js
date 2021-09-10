import { recipes } from "./data/recipes.js";

let allIngredients = [];
let allAppliance = [];
let allUstensils = [];

// fonction qui récupère tout les ingrédients compris dans les recettes
function getAllIngredients() {
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.push(ingredient.ingredient);
    });
  });
}

function getAllAppliance() {
  recipes.forEach((recipe) => {
    allAppliance.push(recipe.appliance);
  });
}

function getAllUstensils() {
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      allUstensils.push(ustensil);
    });
  });
}

getAllIngredients();
getAllUstensils();
getAllAppliance();

// Tri des ingrédients pour qu'il n'y ai pas de double
const INGREDIENTSSORTING = allIngredients.filter(function (ele, pos) {
  return allIngredients.indexOf(ele) == pos;
});

const APPLIANCESSORTING = allAppliance.filter(function (ele, pos) {
  return allAppliance.indexOf(ele) == pos;
});

const USTENSILSSORTING = allUstensils.filter(function (ele, pos) {
  return allUstensils.indexOf(ele) == pos;
});

export { INGREDIENTSSORTING, APPLIANCESSORTING, USTENSILSSORTING };
