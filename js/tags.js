// import {
//   ingredientsTrie,
//   appliancesTrie,
//   ustensilesTrie,
//   getAllItems,
// } from "./data-sorting.js";

// // permet de disposer les tags de recherche en cliquant dessus
// function positionTag(lis, tagIngre, tagApp, tagUst) {
//   lis.forEach((li) => {
//     li.addEventListener("click", function (e) {
//       if (!arrayTags.includes(e.target.dataset.value)) {
//         arrayTags.push(e.target.dataset.value);
//         console.log(arrayTags);
//         if (e.target.classList.contains("ingredientItems")) {
//           tagIngre.innerHTML += `
//               <span class="tagSearch__ingredient__position">${e.target.textContent}</span>
//               `;
//           closeTag();
//         }
//         if (e.target.classList.contains("appareilItems")) {
//           tagApp.innerHTML += `
//               <span class="tagSearch__appareil__position">${e.target.textContent}</span>
//               `;
//           closeTag();
//         }
//         if (e.target.classList.contains("ustensileItems")) {
//           tagUst.innerHTML += `
//               <span class="tagSearch__ustensile__position">${e.target.textContent}</span>
//               `;
//           closeTag();
//         }
//       } else {
//         let removeTag = arrayTags.indexOf(e.target.dataset.value);
//         arrayTags.splice(removeTag);
//         if (e.target.classList.contains("ingredientItems")) {
//           let tagIngre = document.querySelector(".tagSearch__ingredient");
//           let tagsIn = document.querySelectorAll(
//             ".tagSearch__ingredient__position"
//           );
//           tagsIn.forEach((tag) => {
//             if (tag.textContent == e.target.textContent) {
//               tagIngre.removeChild(tag);
//             }
//           });
//         }
//         if (e.target.classList.contains("appareilItems")) {
//           let tagApp = document.querySelector(".tagSearch__appareil");
//           let tagsIn = document.querySelectorAll(
//             ".tagSearch__appareil__position"
//           );
//           tagsIn.forEach((tag) => {
//             if (tag.textContent == e.target.textContent) {
//               tagApp.removeChild(tag);
//             }
//           });
//         }
//         if (e.target.classList.contains("ustensileItems")) {
//           let tagUst = document.querySelector(".tagSearch__ustensile");
//           let tagsIn = document.querySelectorAll(
//             ".tagSearch__ustensile__position"
//           );
//           tagsIn.forEach((tag) => {
//             if (tag.textContent == e.target.textContent) {
//               tagUst.removeChild(tag);
//             }
//           });
//         }
//       }
//     });
//   });
// }

// function closeTag() {
//   let spanTags = document.querySelectorAll(".tagSearch span");
//   spanTags.forEach((span) => {
//     span.addEventListener("click", function (e) {
//       let removeTag = arrayTags.indexOf(e.target.dataset.value);
//       arrayTags.splice(removeTag);
//       console.log(arrayTags);

//       if (e.target.classList.contains("tagSearch__ingredient__position")) {
//         document.querySelector(".tagSearch__ingredient").removeChild(e.target);
//       } else if (e.target.classList.contains("tagSearch__appareil__position")) {
//         document.querySelector(".tagSearch__appareil").removeChild(e.target);
//       } else if (
//         e.target.classList.contains("tagSearch__ustensile__position")
//       ) {
//         document.querySelector(".tagSearch__ustensile").removeChild(e.target);
//       } else {
//       }
//     });
//   });
// }

// export { positionTag, closeTag };
