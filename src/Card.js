export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);

    return cardTemplate.content.cloneNode(true);
  }

  _handleImageClick() {
    const imagePopup = document.querySelector(".popup-zoom-image");
    const imageElement = imagePopup.querySelector(".popup__image");
    const nameElement = imagePopup.querySelector(".popup__place-name");

    imageElement.src = card.link;
    imageElement.alt = `Imagem de ${card.name}`;
    nameElement.textContent = card.name;
    imagePopup.classList.add("popup__opened");
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".pictures__card-image");
    cardImage.src = this._link;
    cardImage.alt = `Imagem de ${this._name}`;
    cardElement.querySelector(".pictures__card-name").textContent = this._name;
    cardElement.querySelector(".pictures__card-like-count").textContent =
      this._likes.length;
    this._setEventListeners(cardElement);
    return cardElement;
  }

  _deleteCard(evt) {
    const pictures = document.querySelector(".pictures");

    const card = evt.target.offsetParent;

    pictures.removeChild(card);
  }

  _giveLike(evt) {
    const heart = evt.target;
    if (heart.getAttribute("src") === "./images/Like.png") {
      heart.setAttribute("src", "./images/FilledHeart.png");
      this._likes.push("userId");
    } else {
      heart.setAttribute("src", "./images/Like.png");
      const index = this._likes.indexOf("userId");
      if (index > -1) {
        this._likes.splice(index, 1);
      }
    }
    this._updateLikeCount();
  }

  _updateLikeCount() {
    const likeCountElement = document.querySelector(
      ".pictures__card-like-count"
    );
    likeCountElement.textContent = this._likes.length;
  }

  _setEventListeners(cardElement) {
    cardElement
      .querySelector(".pictures__trash-icon")
      .addEventListener("click", (evt) => this._deleteCard(evt));

    cardElement
      .querySelector(".pictures__card-like")
      .addEventListener("click", (evt) => this._giveLike(evt));

    cardElement.addEventListener("click", () => this._handleImageClick());
  }
}
