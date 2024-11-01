function lightboxMediasFactory(photographersMedias) {
   const { id, photographerId, title, image, video, likes, date, price } = photographersMedias;

   const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
   const nom = params.get("name").toString(); // Je récupère le nom du photographe

   const mediaPhoto = `./assets/photographers/${nom}/${image}`;
   const mediaVideo = `./assets/photographers/${nom}/${video}`;

   function getLightboxMediaCardDOM() {
      // Création des li
      const carrouselItem = document.createElement("li");
      carrouselItem.className = "carrousel__item";

      // BOUTON CROIX FERMER
      // Création de la div contenant la croix
      const carrouselClose = document.createElement("div");
      carrouselClose.className = "carrousel__close";

      // Création de l'icône croix
      const carrouselCross = document.createElement("img");
      carrouselCross.className = "carrousel__cross";
      carrouselCross.setAttribute("src", "./assets/icons/close-red.svg");
      carrouselCross.setAttribute("tabindex", 6);
      carrouselCross.setAttribute("alt", "Fermer le carrousel");
      carrouselCross.setAttribute("aria-label", "Fermer le carrousel");

      // CONTRÔLES "PRECENDANTE"
      // Création de la div contenant le bouton de contrôle "Précédante"
      const carrouselControlsLeft = document.createElement("div");
      carrouselControlsLeft.className = "carrousel__controls carrousel__controls--left";
      carrouselControlsLeft.setAttribute("role", "button");
      carrouselControlsLeft.setAttribute("aria-label", "Image précédante");
      carrouselControlsLeft.setAttribute("tabindex", 4);

      // Création de la span contenant l'icône et le mot "Précédante"
      const carrouselArrowLeft = document.createElement("span");
      carrouselArrowLeft.className = "carrousel__arrow carrousel__arrow--prev";
      carrouselArrowLeft.setAttribute("aria-hidden", "true");

      // Création de l'icône flèche précédante
      const carrouselIconLeft = document.createElement("i");
      carrouselIconLeft.className = "fas fa-chevron-left";
      carrouselIconLeft.setAttribute("aria-hidden", "true");

      // CONTRÔLES "SUIVANTE"
      // Création de la div contenant le bouton de contrôle "Suivante"
      const carrouselControlsRight = document.createElement("div");
      carrouselControlsRight.className = "carrousel__controls carrousel__controls--right";
      carrouselControlsRight.setAttribute("role", "button");
      carrouselControlsRight.setAttribute("aria-label", "Image suivante");
      carrouselControlsRight.setAttribute("tabindex", 5);

      // Création de la span contenant l'icône et le mot "Suivante"
      const carrouselArrowRight = document.createElement("span");
      carrouselArrowRight.className = "carrousel__arrow carrousel__arrow--next";
      carrouselArrowRight.setAttribute("aria-hidden", "true");

      // Création de l'icône flèche précédante
      const carrouselIconRight = document.createElement("i");
      carrouselIconRight.className = "fas fa-chevron-right";
      carrouselIconRight.setAttribute("aria-hidden", "true");

      // MEDIAS
      // Création de la div contenant les médias : image ou vidéo
      const carrouselElement = document.createElement("div");
      carrouselElement.className = "carrousel__element";

      // Création du titre des médias
      const carrouselTitle = document.createElement("h1");
      carrouselTitle.className = "carrousel__title";
      carrouselTitle.textContent = title;
      carrouselTitle.setAttribute("tabindex", 3);

      // Création du média photo ou video et ajout dans la div mediaElement
      if (video !== undefined) {
         const video = document.createElement("video");
         video.setAttribute("tabindex", 2);
         video.setAttribute("src", mediaVideo);
         video.setAttribute("alt", title);
         video.setAttribute("aria-label", title);
         video.controls = true;
         video.className = "carrousel__media carrousel__media--video";
         carrouselElement.appendChild(video);
         carrouselElement.appendChild(carrouselTitle);
      } else if (image !== undefined) {
         const img = document.createElement("img");
         img.setAttribute("tabindex", 2);
         img.setAttribute("src", mediaPhoto);
         img.setAttribute("alt", title);
         img.setAttribute("aria-label", title);
         img.className = "carrousel__media carrousel__media--img";
         carrouselElement.appendChild(img);
         carrouselElement.appendChild(carrouselTitle);
      } else {
         console.log("Pas d'images ni de vidéos trouvées");
      }

      // Ajout de la croix dans la div carrouselClose
      carrouselClose.appendChild(carrouselCross);

      // Ajout de l'icône carrouselIconLeft dans la span carrouselArrowLeft
      carrouselArrowLeft.appendChild(carrouselIconLeft);

      // Ajout des éléments dans la div carrouselControlsLeft
      carrouselControlsLeft.appendChild(carrouselArrowLeft);

      // Ajout de l'icône carrouselIconRight dans la span carrouselArrowRight
      carrouselArrowRight.appendChild(carrouselIconRight);

      // Ajout des éléments dans la div carrouselControlsRight
      carrouselControlsRight.appendChild(carrouselArrowRight);

      // Ajout des éléments dans la div carrouselItem : carrouselClose + carrouselControls + carrouselElement
      carrouselItem.appendChild(carrouselClose);
      carrouselItem.appendChild(carrouselControlsLeft);
      carrouselItem.appendChild(carrouselControlsRight);
      carrouselItem.appendChild(carrouselElement);

      return carrouselItem;
   }
   return { id, photographerId, title, image, video, likes, date, price, getLightboxMediaCardDOM };
}
