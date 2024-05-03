const content = document.querySelector(".content");
const pageName = content.querySelector(".profile__info-name");
const pageDescription = content.querySelector(".profile__info-attribute");
const popupContent = document.querySelector(".popup__content");
const profilePopup = document.querySelector(".profile-popup");
const localPopup = document.querySelector(".local-popup");
const editButton = content.querySelector(".profile__info-edit-button");
const saveEditButton = document.querySelector(".profile-save-button");
const closeEditButton = document.querySelector(".profile-close-button");
const closeLocalButton = document.querySelector(".local-close-button");
const likeButtons = document.querySelectorAll(".pictures__card-like");
const newPlaceButton = document.querySelector(".profile__info-button-add");
const pictures = document.querySelector(".pictures");
const formAddPlace = document.querySelector(".popup__form-add-place");
const popupZoomImage = document.querySelector(".popup-zoom-image");
const imagePopup = document.querySelector(".popup__zoom-image");
const popups = document.querySelectorAll(".popup");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function renderCard(card) {
  const template = document
    .querySelector("#template")
    .content.querySelector(".pictures__card");

  const currentCard = template.cloneNode(true);

  currentCard.querySelector(".pictures__card-name").textContent = card.name;

  const cardImage = currentCard.querySelector(".pictures__card-image");
  cardImage.src = card.link;
  cardImage.alt = `Imagem de ${card.name}`;
  cardImage.addEventListener("click", function () {
    const imageElement = imagePopup.querySelector(".popup__image");
    const nameElement = imagePopup.querySelector(".popup__place-name");

    imageElement.src = card.link;
    imageElement.alt = `Imagem de ${card.name}`;
    nameElement.textContent = card.name;

    imagePopup.classList.add("popup__opened");
  });

  currentCard
    .querySelector(".pictures__trash-icon")
    .addEventListener("click", (evt) => {
      const pictures = document.querySelector(".pictures");
      const card = evt.target.offsetParent;
      pictures.removeChild(card);
    });

  currentCard
    .querySelector(".pictures__card-like")
    .addEventListener("click", (evt) => giveLike(evt));

  return currentCard;
}

function showEditForm() {
  profilePopup.classList.add("popup__opened");
  closeEditButton.addEventListener("click", hideEditForm);
  saveEditButton.addEventListener("click", (evt) => editInfo(evt));
}

function editInfo(evt) {
  evt.preventDefault();
  const newName = document.querySelector(".popup__content-form-name");
  const newDescription = document.querySelector(
    ".popup__content-form-description"
  );

  if (newName.value === "" || newName.value === null) {
    evt.preventDefault;
  } else {
    pageName.textContent = newName.value;
    pageDescription.textContent = newDescription.value;
    hideEditForm();
  }
}

function hideEditForm() {
  profilePopup.classList.remove("popup__opened");
  closeEditButton.removeEventListener("click", hideEditForm);
  saveEditButton.removeEventListener("click", (evt) => editInfo(evt));
}

function showNewLocalForm() {
  localPopup.classList.add("popup__opened");
  closeLocalButton.addEventListener("click", hideNewLocalForm);
}

function hideNewLocalForm() {
  localPopup.classList.remove("popup__opened");
  closeLocalButton.removeEventListener("click", hideNewLocalForm);
}

formAddPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const name = formAddPlace.querySelector(".popup__input-local-name").value;
  const link = formAddPlace.querySelector(".popup__input-local-link").value;

  const place = {
    name: name,
    link: link,
  };

  const newCard = renderCard(place);

  pictures.prepend(newCard);

  localPopup.classList.remove("popup__opened");
});

function giveLike(evt) {
  const heart = evt.target;

  if (heart.getAttribute("src") === "./images/Like.png") {
    return heart.setAttribute("src", "./images/FilledHeart.png");
  }
  return heart.setAttribute("src", "./images/Like.png");
}

function hideZoomImage() {
  imagePopup.classList.remove("popup__opened");
}

initialCards.forEach((card, index) => {
  const cardItem = renderCard(card);
  pictures.append(cardItem);
});

const zoomImageCloseButton = popupZoomImage.querySelector(".zoom-image_button");
zoomImageCloseButton.addEventListener("click", function () {
  popupZoomImage.classList.remove("popup__opened");
});

editButton.addEventListener("click", showEditForm);
newPlaceButton.addEventListener("click", showNewLocalForm);

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    hideEditForm();
    hideNewLocalForm();
    popupZoomImage.classList.remove("popup__opened");
  }
});

profilePopup.addEventListener("click", () => {
  profilePopup.classList.remove("popup__opened");
});

localPopup.addEventListener("click", () => {
  localPopup.classList.remove("popup__opened");
});

popupZoomImage.addEventListener("click", () => {
  popupZoomImage.classList.remove("popup__opened");
});
