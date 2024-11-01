/**
 * Récupère les données des photographes à partir du fichier JSON.
 * @returns {Promise<{photographers: Array, photographersMedias: Array}>} Une promesse qui se résout en un objet contenant les données des photographes et leurs médias.
 * @throws {Error} Si le fichier JSON n'est pas trouvé ou s'il y a une erreur lors de la récupération des données.
 */
async function getPhotographers() {
   try {
      const response = await fetch("../data/photographers.json");
      if (response.status === 200) {
         const dataPhotographers = await response.json();
         const photographers = dataPhotographers.photographers;
         const photographersMedias = dataPhotographers.media;
         return {
            photographers: [...photographers],
            photographersMedias: [...photographersMedias],
         };
      } else {
         throw "Le fichier JSON n'a pas été trouvé";
      }
   } catch (error) {
      throw error;
   }
}

/**
 * Affiche les données de l'en-tête du photographe sur la page.
 * @param {Array} photographers - Le tableau des données des photographes.
 */
async function displayData(photographers) {
   const photographersHeader = document.querySelector(".photographer__header");
   const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
   const idURL = parseInt(params.get("id"), 10); // Je récupère la valeur associée à mon id
   const isIDPhotograph = photographers.find((isId) => isId.id === idURL); // Je trouve dans mon tableau d'objet l'id à récupérer
   const photographerHeaderModel = headerPhotographerFactory(isIDPhotograph);
   const photographerCardDOM = photographerHeaderModel.getPhotographerCardDOM();
   photographersHeader.appendChild(photographerCardDOM);
}

/**
 * Affiche le formulaire de contact du photographe sur la page.
 * @param {Array} photographersMedias - Le tableau des données des médias des photographes.
 */
async function displayDataContactPhotographer(photographersMedias) {
   const contactPhotographerSection = document.querySelector(".contact__modal");
   const photographerContactModel = contactPhotographerFactory(photographersMedias);
   const photographerContactCardDOM = photographerContactModel.getContactPhotographerCardDOM();
   contactPhotographerSection.appendChild(photographerContactCardDOM);
}

/**
 * Affiche les données des médias du photographe sur la page.
 * @param {Array} photographersMedias - Le tableau des données des médias des photographes.
 */
async function displayDataMedia(photographersMedias) {
   const photographersMediasSection = document.querySelector(".container__medias");
   const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
   const idURL = parseInt(params.get("id"), 10); // Je récupère la valeur associée à mon id
   const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL); // Je filtre mon tableau d'objet grâce à l'id récupérée
   photographersMediasSection.innerHTML = ""; // J'efface le contenu de container__medias : je réinitialise pour que ce soit vide
   results.forEach((result) => {
      // Pour chaque média associé à l'url du photographe filtré, je créé la carte MediaCardDom
      const photographerMediaModel = photographerMediasFactory(result);
      const photographerMediaCardDOM = photographerMediaModel.getMediaCardDOM();
      photographersMediasSection.appendChild(photographerMediaCardDOM);
   });
}

/**
 * Affiche les données de l'encart du photographe sur la page.
 * @param {Array} photographers - Le tableau des données des photographes.
 */
async function displayDataEncart(photographers) {
   const photographersEncartSection = document.querySelector(".photographer__footer");
   const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
   const idURL = parseInt(params.get("id"), 10); // Je récupère la valeur associée à mon id
   const isIDPhotograph = photographers.find((isId) => isId.id === idURL); // Je trouve dans mon tableau d'objet l'id à récupérer
   const photographerEncartModel = encartMediasFactory(isIDPhotograph);
   const photographerEncartCardDOM = photographerEncartModel.getEncartCardDOM();
   photographersEncartSection.appendChild(photographerEncartCardDOM);
}

/**
 * Initialise la page en récupérant et affichant les données des photographes et de leurs médias.
 */
async function init() {
   // Récupère les datas des photographes
   const { photographers } = await getPhotographers();
   displayData(photographers);

   // Récupère les datas medias des photographes
   const { photographersMedias } = await getPhotographers();
   displayDataContactPhotographer(photographersMedias);
   displayDataMedia(photographersMedias);
   displayDataEncart(photographers);

   // Récupère les fonctions de gestion des événements
   manageContactForm();
   manageDropDown(photographersMedias);
   manageCarousel(photographersMedias);
   manageCounterLikes();
}

init();
