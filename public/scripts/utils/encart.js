/********* FUNCTIONS : AJOUT D'UN CLICK ET CALCUL DU TOTAL *********/
let click = 1;

function addClick(currentCard) {
   const oldLike = parseFloat(currentCard.textContent);
   const newLike = oldLike + click;
   currentCard.textContent = newLike;
}

function total() {
   let somme = 0;
   const likesInitial = document.querySelectorAll(".card__media-likes");
   const totalLikes = document.querySelector(".encart__likes--total");
   likesInitial.forEach(function (likeInit) {
      const numberInit = parseFloat(likeInit.textContent);
      somme = somme + numberInit;
      totalLikes.textContent = somme;
   });
}

/********* FUNCTIONS : GESTION DU COMPTEUR DE LIKES *********/
function manageCounterLikes() {
   const hearthIcons = document.querySelectorAll(".card__media--icon-heart");

   hearthIcons.forEach((btn) =>
      btn.addEventListener("click", function () {
         const currentCard = this.previousElementSibling;
         if ("likeClicked" in currentCard.dataset === false) {
            currentCard.dataset.likeClicked = "clicked";
            this.setAttribute("aria-label", "Un like ajouté");
            addClick(currentCard);
            total();
         } else if ("likeClicked" in currentCard.dataset === true) {
            console.log("Déjà cliqué");
            this.setAttribute("aria-label", "Un like ajouté");
         }
      })
   );

   /* Ajout des likes avec la touch Entrée */
   hearthIcons.forEach((btn) =>
      btn.addEventListener(
         "keydown",
         function (event) {
            const currentCard = this.previousElementSibling;
            if (event.defaultPrevented) {
               return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
            }
            switch (event.key) {
               case "Enter":
                  if ("likeClicked" in currentCard.dataset === false) {
                     // Si data-like-clicked n'existe pas,
                     currentCard.dataset.likeClicked = "clicked"; // alors je l'ajoute et lui donne la valeur clicked,
                     this.setAttribute("aria-label", "Un like ajouté"); //je modifie l'aria-label de l'icône pour dire qu'un like a été ajouté
                     addClick(currentCard); // j'ajoute 1 click
                     total(); // je calcule le total
                  } else if ("likeClicked" in currentCard.dataset === true) {
                     console.log("Déjà cliqué");
                     this.setAttribute("aria-label", "Un like ajouté");
                  }
                  break;
            }
         },
         true
      )
   );
}
