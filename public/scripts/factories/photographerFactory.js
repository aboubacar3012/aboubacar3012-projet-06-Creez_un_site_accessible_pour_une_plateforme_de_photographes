function photographerFactory(photographers) {
    const { name, id, city, country, tagline, price, portrait } = photographers;

    const picture = `./assets/photographers/Photographers ID Photos/${portrait}`;

    // FACTORY DE LA PAGE D'ACCUEIL : Liste des photographes disponibles sur la plateforme

    function getUserCardDOM() {
        // Création de l'élément article card__content
        const article = document.createElement('article');
        article.className = 'card__content';

        // Création de la div card__photographer
        const div1 = document.createElement('div');
        div1.className = 'card__photographer';

        const header = document.createElement('header');
        header.className = 'card__header';

        // Création du lien pour l'image et le titre h2 : aria-label et url
        const a = document.createElement('a');
        a.className = 'card__link';
        a.setAttribute("aria-label", name);
        a.setAttribute("href", "photographer.html?" + "id=" + id + "&name=" + name);
        a.setAttribute("tabindex", "0");

        // Création de l'image et attribut alt
        const img = document.createElement('img');
        img.className = 'card__img';
        img.setAttribute("src", picture);
        img.setAttribute("alt", name + "- Page du photographe");

        // Création du titre h2 : nom du photographe
        const h2 = document.createElement('h2');
        h2.className = 'card__title';
        h2.textContent = name;

        // Création du body de la carte
        const body = document.createElement('section');
        body.className = 'card__body';

        // Création du titre h3 : ville et pays
        const h3 = document.createElement('h3');
        h3.className = 'card__location';
        h3.textContent = city + ", " + country;
        h3.setAttribute("tabindex", "0");

        // Créations des paragraphes : tagline et price
        const p1 = document.createElement('p');
        p1.className = 'card__tagline';
        p1.textContent = tagline;
        p1.setAttribute("tabindex", "0");

        const p2 = document.createElement('p');
        p2.className = 'card__price';
        p2.textContent = price + "€ par jour";
        p2.setAttribute("tabindex", "0");

        // Ajout des éléments image et titre h2 dans le lien (balise a)
        a.appendChild(img);
        a.appendChild(h2);

        // Ajout du lien dans le header de la carte
        header.appendChild(a);

        // Ajout du titre h3 et des paragraphes dans le body de la carte
        body.appendChild(h3);
        body.appendChild(p1);
        body.appendChild(p2);

        // Ajout du header et du body dans la div card__photographer
        div1.appendChild(header);
        div1.appendChild(body);

        // Ajout de la div card__photographer dans article
        article.appendChild(div1);

        return (article);
    }

    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}