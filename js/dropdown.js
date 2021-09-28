// constante qui permet d'ouvrir les menus déroulant
const openList = function (
  dropIngredient,
  dropAppareil,
  dropUstensile,
  appareil,
  ustensile
) {
  document.addEventListener("click", function (e) {
    let cible = e.target;
    if (
      cible.id === "dropdownMenuIngredient" ||
      cible.id === "dropdownMenuUstensile" ||
      cible.id === "dropdownMenuAppareil"
    ) {
      if (cible.classList.contains("ingredient__button")) {
        dropIngredient.classList.remove("hidde");
        appareil.classList.add("move");
        ustensile.classList.add("move");
      }
      if (cible.classList.contains("appareil__button")) {
        dropAppareil.classList.remove("hidde");
        ustensile.classList.add("move");
      }
      if (cible.classList.contains("ustensile__button")) {
        dropUstensile.classList.remove("hidde");
      }
    }
    if (cible.classList.contains("flecheOpen")) {
      if (cible.classList.contains("flecheIngredient")) {
        dropIngredient.classList.remove("hidde");
        appareil.classList.add("move");
        ustensile.classList.add("move");
      }
      if (cible.classList.contains("flecheAppareil")) {
        dropAppareil.classList.remove("hidde");
        ustensile.classList.add("move");
      }
      if (cible.classList.contains("flecheUstensile")) {
        dropUstensile.classList.remove("hidde");
      }
    }
  });
};

// permet de fermer les menus déroulant
const closeList = function (e, bouttons) {
  console.log(e.target);
  if (
    e.target.classList.contains("fleche") ||
    !e.target.classList.contains("input")
  ) {
    document.querySelectorAll(".boutons").forEach((bouton) => {
      if (!bouton.classList.contains("hidde")) {
        bouton.classList.add("hidde");
        bouttons.forEach((button) => {
          button.classList.remove("move");
        });
      }
    });
  }
};

export { openList, closeList };
