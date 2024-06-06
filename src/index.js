import "./pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

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

new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    errorSelector: ".form__input-error",
  },
  document.querySelector(".popup__content-form")
).enableValidation();

new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    errorSelector: ".form__input-error",
  },
  document.querySelector(".popup__form-add-place")
).enableValidation();

const popupImage = new PopupWithImage(".popup-zoom-image");

const handleCardClick = ({ name, link }) => {
  popupImage.open(link, name);
};

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#template", handleCardClick);
      const cardElement = card.generateCard();
      const cardImage = cardElement.querySelector(".pictures__card-image");

      cardImage.addEventListener("click", function () {
        popupImage.open(data.link, data.name);
      });
      return cardElement;
    },
  },
  ".pictures"
);
section.renderItems();

const newPlaceButton = document.querySelector(".profile__info-button-add");
const placePopup = new PopupWithForm((placeData) => {
  section.addItem(placeData);
}, ".local-popup");

newPlaceButton.addEventListener("click", function () {
  placePopup.open();
});

const editProfileButton = document.querySelector(".profile__info-edit-button");
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-attribute",
});

const profilePopup = new PopupWithForm((formData) => {
  userInfo.setUserInfo(formData);
}, ".profile-popup");

editProfileButton.addEventListener("click", function () {
  profilePopup.open();
});
