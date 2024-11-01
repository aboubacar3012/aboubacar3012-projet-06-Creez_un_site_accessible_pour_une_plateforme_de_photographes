function photographerMediasFactory(photographersMedias) {
   const { id, photographerId, title, image, video, likes, date, price } = photographersMedias;

   const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
   const nom = params.get("name").toString(); // Je récupère le nom du photographe

   const mediaPhoto = `./assets/photographers/${nom}/${image}`;
   const mediaVideo = `./assets/photographers/${nom}/${video}`;

   function getMediaCardDOM() {
      // Création du conteneur article
      const article = document.createElement("article");
      article.className = "card__media";

      // Création du conteneur media element
      const mediaElement = document.createElement("div");
      mediaElement.className = "card__media-element";
      mediaElement.setAttribute("tabindex", "0");
      mediaElement.setAttribute("id", id);

      // Création du média photo ou video et ajout dans la div mediaElement
      if (video !== undefined) {
         const video = document.createElement("video");
         video.setAttribute("src", mediaVideo);
         video.setAttribute("alt", title);
         video.setAttribute("aria-label", title);
         video.controls = false;
         video.className = "card__media--video";
         mediaElement.appendChild(video);
      } else if (image !== undefined) {
         const img = document.createElement("img");
         img.setAttribute("src", mediaPhoto);
         img.setAttribute("alt", title);
         img.className = "card__media--img";
         mediaElement.appendChild(img);
      } else {
         console.log("Pas d'images ni de vidéos trouvées");
      }

      // Création du conteneur media informations
      const mediaInfos = document.createElement("div");
      mediaInfos.className = "card__media-infos";

      // Création du titre
      const titre = document.createElement("h3");
      titre.className = "card__media--title";
      titre.textContent = title;
      titre.setAttribute("tabindex", "0");

      // Création du conteneur icon
      const conteneurIcon = document.createElement("div");
      conteneurIcon.className = "card__media-icon";

      // Création du nombre de likes
      const nbLikes = document.createElement("p");
      nbLikes.className = "card__media-likes";
      nbLikes.textContent = likes;
      const textNbLikes = likes + "likes";
      nbLikes.setAttribute("aria-label", textNbLikes);
      nbLikes.setAttribute("tabindex", "0");

      // Création de l'icône
      const icon = document.createElement("i");
      icon.className = "fas fa-heart card__media--icon-heart";
      icon.setAttribute("aria-label", "Icon : ajouter un like");
      icon.setAttribute("tabindex", "0");

      // Ajout de l'icône dans le conteneur icône
      conteneurIcon.appendChild(nbLikes);
      conteneurIcon.appendChild(icon);

      // Ajout du titre et de l'icône dans le conteneur mediaInfos
      mediaInfos.appendChild(titre);
      mediaInfos.appendChild(conteneurIcon);

      // Ajout des éléments mediaElement et mediaInfos dans l'article
      article.appendChild(mediaElement);
      article.appendChild(mediaInfos);

      return article;
   }
   return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM };
}
