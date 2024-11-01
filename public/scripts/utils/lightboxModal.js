/**
 * Ouvre la lightbox modal.
 */
function displayModalLightbox() {
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const main = document.querySelector(".content");
  const modal = document.querySelector("#carrouselModal");
  modal.style.display = "block";
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("body--no-scroll");
  modal.focus();
  document.querySelector('[data-card-focused ="focused"]').removeAttribute("data-card-focused");
}

/**
 * Ferme la lightbox modal.
 */
function closeModalLightbox() {
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const main = document.querySelector(".content");
  const modal = document.querySelector("#carrouselModal");
  modal.style.display = "none";
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("body--no-scroll");
  currentItemPosition = 0;
  const cardFocused = document.querySelector('[data-card-focused ="focused"]');
  cardFocused.focus();
}

/**
 * Passe à la diapositive suivante dans la lightbox.
 */
function goToNextSlide() {
  const carouselItems = document.querySelectorAll(".carrousel__item");
  const nbCarouselItems = carouselItems.length;
  carouselItems[0].style.display = "none";
  if (currentItemPosition + 1 >= nbCarouselItems) {
    const lastItem = carouselItems[currentItemPosition];
    currentItemPosition = 0;
    const currentItem = carouselItems[currentItemPosition];
    carouselItems[0].style.display = "block";
    setNodeAttributes(lastItem, currentItem);
  } else {
    currentItemPosition++;
    const lastItem = carouselItems[currentItemPosition - 1];
    const currentItem = carouselItems[currentItemPosition];
    setNodeAttributes(lastItem, currentItem);
  }
}

/**
 * Passe à la diapositive précédente dans la lightbox.
 */
function goToPreviousSlide() {
  const carouselItems = document.querySelectorAll(".carrousel__item");
  const nbCarouselItems = carouselItems.length;
  carouselItems[0].style.display = "none";
  if (currentItemPosition - 1 >= 0) {
    currentItemPosition -= 1;
    const currentItem = carouselItems[currentItemPosition];
    const lastItem = carouselItems[currentItemPosition + 1];
    setNodeAttributes(lastItem, currentItem);
  } else {
    const lastItem = carouselItems[currentItemPosition];
    currentItemPosition = nbCarouselItems - 1;
    const currentItem = carouselItems[currentItemPosition];
    carouselItems[0].style.display = "block";
    setNodeAttributes(lastItem, currentItem);
  }
}

/**
 * Définit les attributs pour les éléments de diapositive actuels et précédents.
 * @param {HTMLElement} lastItem - Le dernier élément de la diapositive.
 * @param {HTMLElement} currentItem - L'élément de la diapositive actuelle.
 */
function setNodeAttributes(lastItem, currentItem) {
  lastItem.style.display = "none";
  currentItem.style.display = "block";
  lastItem.setAttribute("aria-hidden", "true");
  currentItem.setAttribute("aria-hidden", "false");
}

/**
 * Affiche les données des médias de la lightbox.
 * @param {Array} photographersMedias - Le tableau des données des médias des photographes.
 * @param {number} idCurrent - L'ID du média actuel.
 * @param {string} type - Le type de tri pour les médias.
 */
async function displayDataLightboxMedia(photographersMedias, idCurrent, type) {
  const carrouselUlSection = document.querySelector(".carrousel__list");
  carrouselUlSection.innerHTML = "";
  const params = new URL(document.location).searchParams;
  const idURL = parseInt(params.get("id"), 10);
  const results = photographersMedias.filter((photographersMedia) => photographersMedia.photographerId === idURL);

  if (type === "Popularité") {
    results.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (type === "Titre") {
    results.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (type === "Date") {
    results.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  } else {
    console.log("Initialisation de la lightbox");
  }

  const idCurrentMedia = parseInt(idCurrent);
  const isFindMedia = results.find((isId) => isId.id === idCurrentMedia);
  const isLargeNumber = (element) => element === isFindMedia;
  const positionToFind = results.findIndex(isLargeNumber);

  for (let i = positionToFind; i < results.length; i++) {
    const result1 = results[i];
    const carrouselModalModel = lightboxMediasFactory(result1);
    const carrouselMediaCardDOM = carrouselModalModel.getLightboxMediaCardDOM();
    carrouselUlSection.appendChild(carrouselMediaCardDOM);
  }

  for (let x = 0; x < positionToFind; x++) {
    const result2 = results[x];
    const carrouselModalModel = lightboxMediasFactory(result2);
    const carrouselMediaCardDOM = carrouselModalModel.getLightboxMediaCardDOM();
    carrouselUlSection.appendChild(carrouselMediaCardDOM);
  }

  const carouselItems = document.querySelectorAll(".carrousel__item");
  const nbCarouselItems = carouselItems.length;
  for (i = 1; i < nbCarouselItems; i++) {
    carouselItems[i].style.display = "none";
  }
}

/**
 * Gère les événements du carrousel pour la lightbox.
 * @param {Array} photographersMedias - Le tableau des données des médias des photographes.
 */
function manageCarousel(photographersMedias) {
  const cardMedia = document.querySelectorAll(".card__media-element");
  const modalLightBox = document.querySelector("#carrouselModal");

  cardMedia.forEach((btn) =>
    btn.addEventListener("click", function () {
      const idCurrent = this.getAttribute("id");
      const buttonWrapper = document.querySelector(".button__wrapper");
      const type = buttonWrapper.dataset.optionClicked;
      const currentMedia = document.getElementById(idCurrent);
      currentMedia.dataset.cardFocused = "focused";

      displayDataLightboxMedia(photographersMedias, idCurrent, type);
      displayModalLightbox();

      currentMedia.dataset.cardFocused = "focused";

      const nextBtn = document.querySelectorAll(".carrousel__controls--right");
      const prevBtn = document.querySelectorAll(".carrousel__controls--left");
      nextBtn.forEach((btn) => btn.addEventListener("click", goToNextSlide));
      prevBtn.forEach((btn) => btn.addEventListener("click", goToPreviousSlide));

      const buttonCloseLightbox = document.querySelectorAll(".carrousel__cross");
      buttonCloseLightbox.forEach((btn) =>
        btn.addEventListener("click", function () {
          closeModalLightbox();
        })
      );
    })
  );

  cardMedia.forEach((btn) =>
    btn.addEventListener(
      "keydown",
      function (event) {
        const idCurrent = this.getAttribute("id");
        const buttonWrapper = document.querySelector(".button__wrapper");
        const type = buttonWrapper.dataset.optionClicked;
        const currentMedia = document.getElementById(idCurrent);

        if (event.defaultPrevented) {
          return;
        }
        switch (event.key) {
          case "Enter":
            currentMedia.dataset.cardFocused = "focused";
            displayDataLightboxMedia(photographersMedias, idCurrent, type);
            displayModalLightbox();
            currentMedia.dataset.cardFocused = "focused";
            break;
        }

        const nextBtn = document.querySelectorAll(".carrousel__controls--right");
        nextBtn.forEach((btn) =>
          btn.addEventListener(
            "keydown",
            function (event) {
              if (event.defaultPrevented) {
                return;
              }
              switch (event.key) {
                case "Enter":
                  goToNextSlide();
              }
              event.preventDefault();
            },
            true
          )
        );

        const prevBtn = document.querySelectorAll(".carrousel__controls--left");
        prevBtn.forEach((btn) =>
          btn.addEventListener(
            "keydown",
            function (event) {
              if (event.defaultPrevented) {
                return;
              }
              switch (event.key) {
                case "Enter":
                  goToPreviousSlide();
              }
              event.preventDefault();
            },
            true
          )
        );

        const buttonCloseLightbox = document.querySelectorAll(".carrousel__cross");
        buttonCloseLightbox.forEach((btn) =>
          btn.addEventListener(
            "keydown",
            function (event) {
              if (event.defaultPrevented) {
                return;
              }
              switch (event.key) {
                case "Enter":
                  closeModalLightbox();
                  break;
              }
              event.preventDefault();
            },
            true
          )
        );
      },
      true
    )
  );

  modalLightBox.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "ArrowLeft":
          goToPreviousSlide();
          modalLightBox.focus();
          event.preventDefault();
          break;

        case "ArrowRight":
          goToNextSlide();
          modalLightBox.focus();
          event.preventDefault();
          break;

        case "Escape":
          closeModalLightbox();
          break;
      }
    },
    true
  );
}
