/**
 * Ajoute un clic au compteur de likes de la carte actuelle.
 * @param {HTMLElement} currentCard - L'élément de la carte actuelle.
 */
let click = 1;

function addClick(currentCard) {
   const oldLike = parseFloat(currentCard.textContent); // Récupère le nombre de likes actuel
   const newLike = oldLike + click; // Ajoute un like
   currentCard.textContent = newLike; // Met à jour le nombre de likes affiché
}

/**
 * Calcule le nombre total de likes et met à jour l'élément des likes totaux.
 */
function total() {
   let somme = 0; // Initialise la somme des likes à 0
   const likesInitial = document.querySelectorAll(".card__media-likes"); // Sélectionne tous les éléments de likes
   const totalLikes = document.querySelector(".encart__likes--total"); // Sélectionne l'élément des likes totaux
   likesInitial.forEach(function (likeInit) {
      const numberInit = parseFloat(likeInit.textContent); // Convertit le texte en nombre
      somme = somme + numberInit; // Ajoute le nombre de likes à la somme totale
      totalLikes.textContent = somme; // Met à jour le texte de l'élément des likes totaux
   });
}

/**
 * Gère le compteur de likes pour les cartes de médias.
 */
function manageCounterLikes() {
   const hearthIcons = document.querySelectorAll(".card__media--icon-heart"); // Sélectionne tous les icônes de cœur

   hearthIcons.forEach((btn) =>
      btn.addEventListener("click", function () {
         const currentCard = this.previousElementSibling; // Sélectionne l'élément précédent (le compteur de likes)
         if ("likeClicked" in currentCard.dataset === false) {
            currentCard.dataset.likeClicked = "clicked"; // Ajoute un attribut de données pour indiquer que le like a été cliqué
            this.setAttribute("aria-label", "Un like ajouté"); // Met à jour l'aria-label pour indiquer qu'un like a été ajouté
            addClick(currentCard); // Ajoute un like
            total(); // Met à jour le total des likes
         } else if ("likeClicked" in currentCard.dataset === true) {
            console.log("Déjà cliqué");
            this.setAttribute("aria-label", "Un like ajouté");
         }
      })
   );

   /* Ajout des likes avec la touche Entrée */
   hearthIcons.forEach((btn) =>
      btn.addEventListener(
         "keydown",
         function (event) {
            const currentCard = this.previousElementSibling; // Sélectionne l'élément précédent (le compteur de likes)
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
