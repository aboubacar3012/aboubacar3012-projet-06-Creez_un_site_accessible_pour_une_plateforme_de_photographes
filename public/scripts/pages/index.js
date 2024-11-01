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

async function displayData(photographers) {
   const photographersSection = document.querySelector(".photographer__section");

   photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
   });
}

async function init() {
   // Récupère les datas des photographes
   const { photographers } = await getPhotographers();
   displayData(photographers);
}

init();
