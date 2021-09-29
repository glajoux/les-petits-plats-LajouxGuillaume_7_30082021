import { recipes } from "./data/recipes.js";

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

function getAllItems(recipes) {
  getAllIngredient(recipes);
  getAllAppliances(recipes);
  getAllUstensile(recipes);
}

let ingredientsTrieLowerCase = [];
ingredientsTrie.forEach((ingredient) => {
  ingredientsTrieLowerCase.push(ingredient.toLowerCase());
});

console.log(ingredientsTrie, appliancesTrie, ustensilesTrie);

export { ingredientsTrie, appliancesTrie, ustensilesTrie, getAllItems };
