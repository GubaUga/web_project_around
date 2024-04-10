const content = document.querySelector(".content");
const pageName = content.querySelector(".profile__info-name");
const pageDescription = content.querySelector(".profile__info-attribute");
const profilePopup = document.querySelector(".profile__popup");
const localPopup = document.querySelector(".local__popup");
const editButton = content.querySelector(".profile__info-edit-button");
// Preciso arrumar os botoões para não ser necessário criar 1 botão para cada formulário
const saveEditButton = document.querySelector(".profile__save-button");
const closeEditButton = document.querySelector(".profile__close-button");
const saveLocalButton = document.querySelector(".local__save-button");
const closeLocalButton = document.querySelector(".local__close-button");
const likeButtons = document.querySelectorAll(".pictures__card-like");
const newPlaceButton = document.querySelector(".profile__info-button-add");
const fullImage = document.querySelector(".pictures__card-image");
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
  saveLocalButton.addEventListener("click", (evt) => addLocal(evt));
}

function hideNewLocalForm() {
  localPopup.classList.remove("popup__opened");
  closeLocalButton.removeEventListener("click", hideNewLocalForm);
  saveLocalButton.removeEventListener("click", (evt) => addLocal(evt));
}

function showFullImage() {
  fullImage.classList.add("pictures__card-image-opened");
  closeImageButton.addEventListener("click", hideImage);
}

function addLocal(localValue, urlValue) {
  const localCard = document.createElement("div");
  localCard.classList.add("pictures__card");

  const localImage = document.createElement("img");
  localImage.classList.add("pictures__card-image");
  localImage.textContent = urlValue;

  const localInfo = document.createElement("div");
  localInfo.classList.add("pictures__card-info");

  const localName = document.createElement("h3");
  localName.classList.add("pictures__card-name");
  localName.textContent = localValue;

  const likeButton = document.createElement("img");
  likeButton.classList.add("pictures__card-like");
  likeButton.textContent = "./images/Like.png";

  localCard.append(localImage, localInfo, localName, likeButton);
  initialCards.append(localCard);
}

function giveLike(evt) {
  const heart = evt.target;

  if (heart.getAttribute("src") === "./images/Like.png") {
    return heart.setAttribute("src", "./images/FilledHeart.png");
  }
  return heart.setAttribute("src", "./images/Like.png");
}

likeButtons.forEach((likeButton) =>
  likeButton.addEventListener("click", (evt) => giveLike(evt))
);

editButton.addEventListener("click", showEditForm);
newPlaceButton.addEventListener("click", showNewLocalForm);
fullImage.addEventListener("click", showFullImage);
