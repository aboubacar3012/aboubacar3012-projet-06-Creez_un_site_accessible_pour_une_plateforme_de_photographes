/********* FUNCTIONS : OUVERTURE / FERMETURE DU WRAPPER *********/
/* Function ouverture du wrapper */
function openDropdown() {
   const wrapperSelect = document.querySelector(".wrapper__select");
   const buttonWrapper = document.querySelector(".button__wrapper");
   const wrapperOption1 = document.querySelector(".wrapper__option--1");
   const body = document.querySelector("body");
   wrapperList.setAttribute("aria-hidden", "false");
   wrapperSelect.className += " active";
   buttonWrapper.setAttribute("aria-expanded", "true");
   body.classList.add("body--no-scroll");
   wrapperOption1.focus();
}
/* Function fermeture du wrapper */
function closeDropdown() {
   const wrapperSelect = document.querySelector(".wrapper__select");
   const buttonWrapper = document.querySelector(".button__wrapper");
   const wrapperList = document.querySelector(".wrapper__list");
   const body = document.querySelector("body");
   wrapperList.setAttribute("aria-hidden", "true");
   wrapperSelect.className = "wrapper__select";
   buttonWrapper.setAttribute("aria-expanded", "false");
   body.classList.remove("body--no-scroll");
   buttonWrapper.focus();
}
/* Function changement de nom du wrapper */
function changeName(currentOption) {
   const buttonWrapper = document.querySelector(".button__wrapper");
   const optionText = currentOption.textContent;
   buttonWrapper.textContent = optionText;
   buttonWrapper.dataset.optionClicked = optionText;
}

/********* FUNCTIONS : GESTION DE LA POSITION DU FOCUS DANS LE WRAPPER *********/
let currentOptionPosition = 0;

function goToNextOption() {
   // Aller à la prochaine option
   const wrapperList = document.querySelectorAll(".wrapper__option");
   const nbWrapperOptions = wrapperList.length;
   if (currentOptionPosition + 1 >= nbWrapperOptions) {
      // si la currentOptionPosition est supérieure au nombre d'options alors on revient  au début du wrapper (position 0)*/
      const lastOption = wrapperList[currentOptionPosition];
      currentOptionPosition = 0;
      const currentOption = wrapperList[currentOptionPosition].focus();
   } else {
      // sinon on ajoute +1 à la currentOptionPosition*/
      currentOptionPosition += 1;
      const lastOption = wrapperList[currentOptionPosition - 1];
      const currentOption = wrapperList[currentOptionPosition].focus();
   }
}

function goToPreviousOption() {
   // Revenir à l'option précédante
   const wrapperList = document.querySelectorAll(".wrapper__option");
   const nbWrapperOptions = wrapperList.length;
   if (currentOptionPosition - 1 >= 0) {
      // Si currentOptionPosition - 1 est supérieure ou égale 0, alors on implémente -1 à la currentOptionPosition
      currentOptionPosition -= 1;
      const currentOption = wrapperList[currentOptionPosition].focus();
      const lastOption = wrapperList[currentOptionPosition + 1];
   } else {
      // Sinon on revient à la dernière diapo : nombre de médias - 1
      const lastOption = wrapperList[currentOptionPosition];
      currentOptionPosition = nbWrapperOptions - 1;
      const currentOption = wrapperList[currentOptionPosition].focus();
   }
}

/********* FUNCTIONS : GESTION DES ÉVÉNEMENTS DU WRAPPER *********/
function manageDropDown(photographersMedias) {
   // Ouverture du wrapper
   const buttonWrapper = document.querySelector(".button__wrapper");
   buttonWrapper.addEventListener("click", openDropdown);

   buttonWrapper.addEventListener(
      "keydown",
      function (event) {
         if (event.defaultPrevented) {
            return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
         }
         switch (event.key) {
            case "Enter":
               openDropdown(); // Faire quelque chose pour la touche "entrée" pressée.
               break;
         }
      },
      true
   );

   // Fermeture du wrapper
   const wrapperList = document.querySelectorAll(".wrapper__option");
   wrapperList.forEach((btn) =>
      btn.addEventListener("click", function () {
         const currentOption = this;
         changeName(currentOption);
         associateOption(currentOption);
         closeDropdown();
      })
   );

   /* Functions de tri : sort */
   function sortLikes(results) {
      results.sort(function (a, b) {
         return b.likes - a.likes;
      });
   }
   function sortTitle(results) {
      results.sort(function (a, b) {
         return a.title.localeCompare(b.title);
      });
   }
   function sortDate(results) {
      results.sort(function (a, b) {
         return b.date.localeCompare(a.date);
      });
   }

   async function displayDataMediaLikes(photographersMedias) {
      // Fonction appelée lorsqu'on clique sur l'option Priorité du wrapper
      const photographersMediasSection = document.querySelector(".container__medias");
      const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
      const idURL = parseInt(params.get("id"), 10); // Je récupère la valeur associée à mon id
      const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL); // Je filtre mon tableau d'objet grâce à l'id récupérée
      photographersMediasSection.innerHTML = ""; // J'efface le contenu de container__medias : je réinitialise pour que ce soit vide
      sortLikes(results); // Je trie mon tableau en fonction du nb de likes
      results.forEach((result) => {
         // Pour chaque média associé à l'url du photographe filtré, je créé la carte MediaCardDom
         const photographerMediaModel = photographerMediasFactory(result);
         const photographerMediaCardDOM = photographerMediaModel.getMediaCardDOM();
         photographersMediasSection.appendChild(photographerMediaCardDOM);
      });
   }

   async function displayDataMediaDate(photographersMedias) {
      // Fonction appelée lorsqu'on clique sur l'option Date du wrapper
      const photographersMediasSection = document.querySelector(".container__medias");
      const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
      const idURL = parseInt(params.get("id"), 10); // Je récupère la valeur associée à mon id
      const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL); // Je filtre mon tableau d'objet grâce à l'id récupérée
      photographersMediasSection.innerHTML = ""; // J'efface le contenu de container__medias : je réinitialise pour que ce soit vide
      sortDate(results); // Je trie mon tableau en fonction de la date
      results.forEach((result) => {
         // Pour chaque média associé à l'url du photographe filtré, je créé la carte MediaCardDom
         const photographerMediaModel = photographerMediasFactory(result);
         const photographerMediaCardDOM = photographerMediaModel.getMediaCardDOM();
         photographersMediasSection.appendChild(photographerMediaCardDOM);
      });
   }

   async function displayDataMediaTitle(photographersMedias) {
      // Fonction appelée lorsqu'on clique sur l'option Titre du wrapper
      const photographersMediasSection = document.querySelector(".container__medias");
      const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
      const idURL = parseInt(params.get("id"), 10); // Je récupère la valeur associée à mon id
      const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL); // Je filtre mon tableau d'objet grâce à l'id récupérée
      photographersMediasSection.innerHTML = ""; // J'efface le contenu de container__medias : je réinitialise pour que ce soit vide
      sortTitle(results); // Je trie mon tableau en fonction du titre
      results.forEach((result) => {
         // Pour chaque média associé à l'url du photographe filtré, je créé la carte MediaCardDom
         const photographerMediaModel = photographerMediasFactory(result);
         const photographerMediaCardDOM = photographerMediaModel.getMediaCardDOM();
         photographersMediasSection.appendChild(photographerMediaCardDOM);
      });
   }

   /* Function test l'option choisie du wrapper */
   function associateOption(currentOption) {
      const currentText = currentOption.innerText;
      if (currentText === "Popularité") {
         displayDataMediaLikes(photographersMedias);
         manageCarousel(photographersMedias);
         manageCounterLikes();
      } else if (currentText === "Titre") {
         displayDataMediaTitle(photographersMedias);
         manageCarousel(photographersMedias);
         manageCounterLikes();
      } else if (currentText === "Date") {
         displayDataMediaDate(photographersMedias);
         manageCarousel(photographersMedias);
         manageCounterLikes();
      } else {
         console.log("Erreur : pas d'option sélectionnée");
      }
   }

   // Gérer les événements au clavier
   wrapperList.forEach((btn) =>
      btn.addEventListener(
         "keydown",
         function (event) {
            const currentOption = this;
            if (event.defaultPrevented) {
               return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
            }
            switch (event.key) {
               case "Enter":
                  closeDropdown();
                  changeName(currentOption);
                  associateOption(currentOption);
                  event.preventDefault();
                  break;
               case "ArrowDown": // Lorsque la touche "flèche bas" pressée, aller à la prochaine option
                  goToNextOption();
                  break;

               case "ArrowUp": // Lorsque la touche "flèche haut" pressée, aller à l'option précédante
                  goToPreviousOption();
                  break;

               case "Escape":
                  closeDropdown();
                  break;
            }
         },
         true
      )
   );
}