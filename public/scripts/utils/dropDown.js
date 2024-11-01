/**
 * Ouvre le menu déroulant.
 */
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

/**
 * Ferme le menu déroulant.
 */
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

/**
 * Change le nom du bouton déroulant pour l'option sélectionnée.
 * @param {HTMLElement} currentOption - L'option actuellement sélectionnée.
 */
function changeName(currentOption) {
   const buttonWrapper = document.querySelector(".button__wrapper");
   const optionText = currentOption.textContent;
   buttonWrapper.textContent = optionText;
   buttonWrapper.dataset.optionClicked = optionText;
}

let currentOptionPosition = 0;

/**
 * Déplace le focus vers l'option suivante dans le menu déroulant.
 */
function goToNextOption() {
   const wrapperList = document.querySelectorAll(".wrapper__option");
   const nbWrapperOptions = wrapperList.length;
   if (currentOptionPosition + 1 >= nbWrapperOptions) {
      const lastOption = wrapperList[currentOptionPosition];
      currentOptionPosition = 0;
      const currentOption = wrapperList[currentOptionPosition].focus();
   } else {
      currentOptionPosition += 1;
      const lastOption = wrapperList[currentOptionPosition - 1];
      const currentOption = wrapperList[currentOptionPosition].focus();
   }
}

/**
 * Déplace le focus vers l'option précédente dans le menu déroulant.
 */
function goToPreviousOption() {
   const wrapperList = document.querySelectorAll(".wrapper__option");
   const nbWrapperOptions = wrapperList.length;
   if (currentOptionPosition - 1 >= 0) {
      currentOptionPosition -= 1;
      const currentOption = wrapperList[currentOptionPosition].focus();
      const lastOption = wrapperList[currentOptionPosition + 1];
   } else {
      const lastOption = wrapperList[currentOptionPosition];
      currentOptionPosition = nbWrapperOptions - 1;
      const currentOption = wrapperList[currentOptionPosition].focus();
   }
}

/**
 * Gère les événements du menu déroulant.
 * @param {Array} photographersMedias - Le tableau des données des médias des photographes.
 */
function manageDropDown(photographersMedias) {
   const buttonWrapper = document.querySelector(".button__wrapper");
   buttonWrapper.addEventListener("click", openDropdown);

   buttonWrapper.addEventListener(
      "keydown",
      function (event) {
         if (event.defaultPrevented) {
            return;
         }
         switch (event.key) {
            case "Enter":
               openDropdown();
               break;
         }
      },
      true
   );

   const wrapperList = document.querySelectorAll(".wrapper__option");
   wrapperList.forEach((btn) =>
      btn.addEventListener("click", function () {
         const currentOption = this;
         changeName(currentOption);
         associateOption(currentOption);
         closeDropdown();
      })
   );

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
      const photographersMediasSection = document.querySelector(".container__medias");
      const params = new URL(document.location).searchParams;
      const idURL = parseInt(params.get("id"), 10);
      const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL);
      photographersMediasSection.innerHTML = "";
      sortLikes(results);
      results.forEach((result) => {
         const photographerMediaModel = photographerMediasFactory(result);
         const photographerMediaCardDOM = photographerMediaModel.getMediaCardDOM();
         photographersMediasSection.appendChild(photographerMediaCardDOM);
      });
   }

   async function displayDataMediaDate(photographersMedias) {
      const photographersMediasSection = document.querySelector(".container__medias");
      const params = new URL(document.location).searchParams;
      const idURL = parseInt(params.get("id"), 10);
      const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL);
      photographersMediasSection.innerHTML = "";
      sortDate(results);
      results.forEach((result) => {
         const photographerMediaModel = photographerMediasFactory(result);
         const photographerMediaCardDOM = photographerMediaModel.getMediaCardDOM();
         photographersMediasSection.appendChild(photographerMediaCardDOM);
      });
   }

   async function displayDataMediaTitle(photographersMedias) {
      const photographersMediasSection = document.querySelector(".container__medias");
      const params = new URL(document.location).searchParams;
      const idURL = parseInt(params.get("id"), 10);
      const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL);
      photographersMediasSection.innerHTML = "";
      sortTitle(results);
      results.forEach((result) => {
         const photographerMediaModel = photographerMediasFactory(result);
         const photographerMediaCardDOM = photographerMediaModel.getMediaCardDOM();
         photographersMediasSection.appendChild(photographerMediaCardDOM);
      });
   }

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

   wrapperList.forEach((btn) =>
      btn.addEventListener(
         "keydown",
         function (event) {
            const currentOption = this;
            if (event.defaultPrevented) {
               return;
            }
            switch (event.key) {
               case "Enter":
                  closeDropdown();
                  changeName(currentOption);
                  associateOption(currentOption);
                  event.preventDefault();
                  break;
               case "ArrowDown":
                  goToNextOption();
                  break;
               case "ArrowUp":
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
