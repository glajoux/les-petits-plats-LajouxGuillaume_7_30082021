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
