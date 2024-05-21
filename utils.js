const content = document.querySelector(".content");
const zoomImageCloseButton = document.querySelector(".zoom-image-button");
const profilePopup = document.querySelector(".profile-popup");
const closeEditButton = document.querySelector(".profile-close-button");
const saveEditButton = document.querySelector(".profile-save-button");
const pageName = content.querySelector(".profile__info-name");
const pageDescription = content.querySelector(".profile__info-attribute");
const localPopup = document.querySelector(".local-popup");
const closeLocalButton = document.querySelector(".local-close-button");
const imagePopup = document.querySelector(".popup-zoom-image");
const popupZoomImage = document.querySelector(".popup-zoom-image");
const editButton = content.querySelector(".profile__info-edit-button");
const newPlaceButton = document.querySelector(".profile__info-button-add");
const formAddPlace = document.querySelector(".popup__form-add-place");
const popup = document.querySelector(".popup");
const popups = document.querySelectorAll(".popup");
const popupContent = document.querySelector(".popup__content");
const likeButtons = document.querySelectorAll(".pictures__card-like");

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

function hideZoomImage() {
  imagePopup.classList.remove("popup__opened");
}

editButton.addEventListener("click", showEditForm);
newPlaceButton.addEventListener("click", showNewLocalForm);

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

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    hideEditForm();
    hideNewLocalForm();
    popupZoomImage.classList.remove("popup__opened");
  }
});

window.addEventListener("click", (event) => {
  if (event.target === profilePopup) {
    profilePopup.classList.remove("popup__opened");
  }
});

window.addEventListener("click", (event) => {
  if (event.target === localPopup) {
    localPopup.classList.remove("popup__opened");
  }
});

window.addEventListener("click", (event) => {
  if (event.target === popupZoomImage) {
    popupZoomImage.classList.remove("popup__opened");
  }
});

zoomImageCloseButton.addEventListener("click", function () {
  popupZoomImage.classList.remove("popup__opened");
});
