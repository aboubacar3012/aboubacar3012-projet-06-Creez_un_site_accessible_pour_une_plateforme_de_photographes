/**
 * Fonction de fabrique pour créer un en-tête pour les photographes.
 * @param {Object} photographers - Les données des photographes.
 * @param {string} photographers.name - Le nom du photographe.
 * @param {number} photographers.id - L'ID du photographe.
 * @param {string} photographers.city - La ville du photographe.
 * @param {string} photographers.country - Le pays du photographe.
 * @param {string} photographers.tagline - La devise du photographe.
 * @param {number} photographers.price - Le prix du photographe.
 * @param {string} photographers.portrait - L'URL du portrait du photographe.
 * @returns {Object} Un objet contenant les données du photographe et la méthode pour obtenir l'élément DOM de l'en-tête.
 */
function headerPhotographerFactory(photographers) {
  const { name, id, city, country, tagline, price, portrait } = photographers;

  const picture = `./assets/photographers/Photographers ID Photos/${portrait}`;

  // FACTORY DES PAGES PHOTOGRAPHES : création du header pour chaque photographe (photographer.html)

  /**
   * Méthode pour créer l'élément DOM de l'en-tête.
   * @returns {HTMLElement} L'élément DOM de l'en-tête.
   */
  function getPhotographerCardDOM() {
    // Création du conteneur banner
    const banner = document.createElement("div");
    banner.className = "banner";

    // Création de l'élément heading
    const bannerHeading = document.createElement("div");
    bannerHeading.className = "banner__heading";

    // Création du titre h1 : nom du photographe
    const title = document.createElement("h1");
    title.className = "banner__title";
    title.textContent = name;
    title.setAttribute("tabindex", "0");

    // Création du body : location + tagline
    const body = document.createElement("div");
    body.className = "banner__body";
    body.setAttribute("tabindex", "0");

    // Création du titre h2 : location
    const location = document.createElement("h2");
    location.className = "banner__location";
    location.textContent = city + ", " + country;

    // Créations du paragraphe tagline
    const mantra = document.createElement("p");
    mantra.className = "banner__tagline";
    mantra.textContent = tagline;

    // Création du bouton
    const button = document.createElement("button");
    button.className = "button button__contact";
    button.textContent = "Contactez-moi";
    button.setAttribute("aria-label", "Contactez-moi");
    button.setAttribute("tabindex", "0");

    // Création du conteneur du bouton
    const containerButton = document.createElement("div");
    containerButton.className = "banner__button";

    // Création de la div contenant l'image
    const containerImg = document.createElement("div");
    containerImg.className = "banner__img";
    containerImg.setAttribute("tabindex", "0");

    // Création de l'image et attribut alt
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    // Ajout du titre h2 et de la tagline dans le body
    body.appendChild(location);
    body.appendChild(mantra);

    // Ajout du titre h1 et du body dans la div photographer__header
    bannerHeading.appendChild(title);
    bannerHeading.appendChild(body);

    // Ajout du bouton dans le container bouton
    containerButton.appendChild(button);

    // Ajout de l'image dans le container image
    containerImg.appendChild(img);

    // Ajout des éléments dans lea div banner
    banner.appendChild(bannerHeading);
    banner.appendChild(containerButton);
    banner.appendChild(containerImg);

    return (banner);
  }
  // return { name,  id, city, country, tagline, price, picture, getUserCardDOM }
  return { name, id, city, country, tagline, price, picture, getPhotographerCardDOM }
}
