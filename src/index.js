import "./pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-11",
  headers: {
    authorization: "8ed6098f-fb36-4fa5-a328-69061e307ca0",
    "Content-Type": "application/json",
  },
});

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
popupImage.setEventListeners();

api
  .getInitialCards()
  .then((cards) => {
    const section = new Section(
      {
        items: cards,
        renderer: (data) => {
          const card = new Card(data, "#template", handleCardClick, api);
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
      api
        .addCard({
          name: placeData["title"],
          link: placeData["url"],
        })
        .then((newCard) => {
          section.addItem(newCard);
          placePopup.close();
        })
        .catch((err) =>
          console.error(`Erro ao adicionar cartão ${(err, placeData)}`)
        );
    }, ".local-popup");

    newPlaceButton.addEventListener("click", function () {
      placePopup.open();
    });
  })
  .catch((err) => console.error(`Erro ao adicionar cartões ${err}`));

const handleCardClick = ({ name, link }) => {
  popupImage.open(link, name);
};

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-attribute",
});

api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user);
});

const editProfileButton = document.querySelector(".profile__info-edit-button");
const profilePopup = new PopupWithForm((userData) => {
  api.patchUserInfo(userData).then((apiUser) => {
    userInfo.setUserInfo(apiUser);
  });
}, ".profile-popup");

editProfileButton.addEventListener("click", function () {
  profilePopup.open();
});
