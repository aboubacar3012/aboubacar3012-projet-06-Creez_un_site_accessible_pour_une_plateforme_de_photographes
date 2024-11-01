/**
 * Récupère les données des photographes à partir du fichier JSON.
 * @returns {Promise<{photographers: Array}>} Une promesse qui se résout en un objet contenant les données des photographes.
 * @throws {Error} Si le fichier JSON n'est pas trouvé ou s'il y a une erreur lors de la récupération des données.
 */
async function getPhotographers() {
   try {
      const response = await fetch("../data/photographers.json");
      if (response.status === 200) {
         const dataPhotographers = await response.json();
         const photographers = dataPhotographers.photographers;
         // et bien retourner le tableau photographers seulement une fois
         return {
            photographers: [...photographers],
         };
      } else {
         throw "Le fichier JSON n'a pas été trouvé";
      }
   } catch (error) {
      throw error;
   }
}

/**
 * Affiche les données des photographes sur la page.
 * @param {Array} photographers - Le tableau des données des photographes.
 */
async function displayData(photographers) {
   const photographersSection = document.querySelector(".photographer__section");

   // Boucle à travers chaque photographe et crée leur carte
   photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
   });
}

/**
 * Initialise la page en récupérant et affichant les données des photographes.
 */
async function init() {
   // Récupère les datas des photographes
   const { photographers } = await getPhotographers();
   displayData(photographers);
}

init();
