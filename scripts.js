// function play(game) {
//   "use strict";
//   document.querySelector("#nav li a.selected").className = "";
//   document.querySelector(`#nav li a[data-game=${game}]`).className = "selected";
//   document.getElementById("title").innerHTML = game;
//   document.getElementById("machine").src = `${game}/index.html`;
//   document.title =
//     "GameZone: " + game.substring(0, 1).toUpperCase() + game.substring(1);
// }

// window.addEventListener(
//   "load",
//   () => {
//     "use strict";
//     const header = document.querySelector("header");
//     play(location.hash.substring(1) || "tic-tac-toe");
//     document.querySelector("#nav").addEventListener("click", (e) => {
//       if (e.target.dataset.game) {
//         play(e.target.dataset.game);
//       }
//     });
//   },
//   false
// );
