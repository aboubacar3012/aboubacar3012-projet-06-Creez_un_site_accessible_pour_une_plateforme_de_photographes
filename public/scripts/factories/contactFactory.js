function contactPhotographerFactory(photographersMedias) {
  const { id, photographerId, title, image, video, likes, date, price } = photographersMedias;

  const params = new URL(document.location).searchParams; // Je récupère les paramètres de mon url
  const nom = params.get("name").toString(); // Je récupère le nom du photographe

  // FACTORY DU FORMULAIRE DE CONTACT

  function getContactPhotographerCardDOM() {
    // Création de la modal Form
    const modalForm = document.createElement("div");
    modalForm.setAttribute("id", "modalForm");
    modalForm.className = "modal";

    // Création du header du formulaire
    const header = document.createElement("header");
    header.className = "modal__header";

    // Création du titre du formulaire : h1
    const returnLign = document.createElement("br");
    const name = document.createTextNode(nom);
    const title = document.createElement("h1");
    title.className = "modal__title";
    title.setAttribute("id", "modalTitle");
    title.setAttribute("tabindex", 2);
    title.textContent = "Contactez-moi";
    title.appendChild(returnLign);
    title.appendChild(name);

    // Création du bouton de fermeture
    const buttonClose = document.createElement("img");
    buttonClose.className = "modal__close modal__close--form";
    buttonClose.setAttribute("src", "./assets/icons/close.svg");
    buttonClose.setAttribute("tabindex", 12);
    buttonClose.setAttribute("alt", "Fermer le formulaire de contact");
    buttonClose.setAttribute("aria-label", "Fermer le formulaire de contact");

    // Création du form
    const form = document.createElement("form");
    form.className = "form";
    form.setAttribute("name", "contact");
    form.setAttribute("id", "formContact");

    // Création des div du form
    const formData1 = document.createElement("div");
    formData1.className = "form__data";
    formData1.setAttribute("data-error-visible", "");
    formData1.setAttribute("data-error", "");
    formData1.setAttribute("aria-live", "assertive");

    const formData2 = document.createElement("div");
    formData2.className = "form__data";
    formData2.setAttribute("data-error-visible", "");
    formData2.setAttribute("data-error", "");
    formData2.setAttribute("aria-live", "assertive");

    const formData3 = document.createElement("div");
    formData3.className = "form__data";
    formData3.setAttribute("data-error-visible", "");
    formData3.setAttribute("data-error", "");
    formData3.setAttribute("aria-live", "assertive");

    const formData4 = document.createElement("div");
    formData4.className = "form__data";
    formData4.setAttribute("data-error-visible", "");
    formData4.setAttribute("data-error", "");
    formData4.setAttribute("aria-live", "assertive");

    // Création du label Prénom
    const formLabelFirstName = document.createElement("label");
    formLabelFirstName.className = "form__label";
    formLabelFirstName.setAttribute("tabindex", "3");
    formLabelFirstName.setAttribute("id", "firstNameLabel");
    formLabelFirstName.setAttribute("for", "first");
    formLabelFirstName.textContent = "Prénom";

    // Création de l'input Prénom
    const formTextControlFirstName = document.createElement("input");
    formTextControlFirstName.className = "form__text-control";
    formTextControlFirstName.setAttribute("tabindex", "4");
    formTextControlFirstName.setAttribute("id", "first");
    formTextControlFirstName.setAttribute("name", "first");
    formTextControlFirstName.setAttribute("aria-labelledby", "firstNameLabel");

    // Création du label Nom
    const formLabelLastName = document.createElement("label");
    formLabelLastName.className = "form__label";
    formLabelLastName.setAttribute("tabindex", "5");
    formLabelLastName.setAttribute("id", "lastNameLabel");
    formLabelLastName.setAttribute("for", "last");
    formLabelLastName.textContent = "Nom";

    // Création de l'input Nom
    const formTextControlLastName = document.createElement("input");
    formTextControlLastName.className = "form__text-control";
    formTextControlLastName.setAttribute("tabindex", "6");
    formTextControlLastName.setAttribute("id", "last");
    formTextControlLastName.setAttribute("name", "last");
    formTextControlLastName.setAttribute("aria-labelledby", "lastNameLabel");

    // Création du label Email
    const formLabelEmail = document.createElement("label");
    formLabelEmail.className = "form__label";
    formLabelEmail.setAttribute("tabindex", "7");
    formLabelEmail.setAttribute("id", "emailLabel");
    formLabelEmail.setAttribute("for", "email");
    formLabelEmail.textContent = "Email";

    // Création de l'input Email
    const formTextControlEmail = document.createElement("input");
    formTextControlEmail.className = "form__text-control";
    formTextControlEmail.setAttribute("tabindex", "8");
    formTextControlEmail.setAttribute("id", "email");
    formTextControlEmail.setAttribute("name", "email");
    formTextControlEmail.setAttribute("aria-labelledby", "emailLabel");

    // Création du label Message
    const formLabelMessage = document.createElement("label");
    formLabelMessage.className = "form__label";
    formLabelMessage.setAttribute("tabindex", "9");
    formLabelMessage.setAttribute("id", "messageLabel");
    formLabelMessage.setAttribute("for", "message");
    formLabelMessage.textContent = "Votre message";

    // Création de l'input Message
    const formTextControlMessage = document.createElement("textarea");
    formTextControlMessage.className = "form__text-control form__text-control--message";
    formTextControlMessage.setAttribute("tabindex", "10");
    formTextControlMessage.setAttribute("id", "message");
    formTextControlMessage.setAttribute("name", "message");
    formTextControlMessage.setAttribute("aria-labelledby", "messageLabel");

    // Création du bouton Envoyer
    const buttonSubmit = document.createElement("input");
    buttonSubmit.className = "button button__submit";
    buttonSubmit.setAttribute("tabindex", "11");
    buttonSubmit.setAttribute("type", "submit");
    buttonSubmit.setAttribute("value", "Envoyer");
    buttonSubmit.setAttribute("aria-label", "Envoyer");

    // Ajout du titre + bouton fermer
    header.appendChild(title);
    header.appendChild(buttonClose);

    // Ajout de la div formData Prénom
    formData1.appendChild(formLabelFirstName);
    formData1.appendChild(formTextControlFirstName);

    // Ajout de la div formData Nom
    formData2.appendChild(formLabelLastName);
    formData2.appendChild(formTextControlLastName);

    // Ajout de la div formData Email
    formData3.appendChild(formLabelEmail);
    formData3.appendChild(formTextControlEmail);

    // Ajout de la div formData Message
    formData4.appendChild(formLabelMessage);
    formData4.appendChild(formTextControlMessage);

    // Ajout des div dans le form
    form.appendChild(formData1);
    form.appendChild(formData2);
    form.appendChild(formData3);
    form.appendChild(formData4);

    // Ajout du header, du form et du bouton envoyer dans la div modalForm
    modalForm.appendChild(header);
    modalForm.appendChild(form);
    modalForm.appendChild(buttonSubmit);

    return (modalForm);
  }
  return { id, photographerId, title, image, video, likes, date, price, getContactPhotographerCardDOM };
}