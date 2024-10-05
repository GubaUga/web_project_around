export default class Card {
  constructor(data, templateSelector, handleCardClick, api) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    return cardTemplate.content.cloneNode(true);
  }

  _updateLikeCount() {
    this._element.querySelector(".pictures__card-like-count").textContent =
      this._likes.length;
  }

  _deleteCard(evt) {
    this._api
      .deleteCard(this._id) // Usando a instância `api` salva
      .then(() => {
        evt.target.closest(".pictures__card").remove();
      })
      .catch((err) => console.error(`Erro ao deletar o cartão: ${err}`));
  }

  /*_deleteCard(evt) {
    api
      .deleteCard(this._id)
      .then(() => {
        evt.target.closest(".card").remove();
      })
      .catch((err) => console.error(`Error deleting card: ${err}`));
  }*/

  _giveLike(evt) {
    const heart = evt.target;
    const isLiked = heart.getAttribute("src") === "./images/FilledHeart.png";
    const apiMethod = isLiked ? this._api.unlikeCard : this._api.likeCard;

    apiMethod(this._id)
      .then((updatedCard) => {
        this._likes = updatedCard.likes;
        this._updateLikeCount();
        heart.setAttribute(
          "src",
          isLiked ? "./images/Like.png" : "./images/FilledHeart.png"
        );
      })
      .catch((err) => console.error(`Error updating like: ${err}`));
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

  _setEventListeners(cardElement) {
    cardElement
      .querySelector(".pictures__trash-icon")
      .addEventListener("click", (evt) => this._deleteCard(evt));
    cardElement
      .querySelector(".pictures__card-like")
      .addEventListener("click", (evt) => this._giveLike(evt));
  }
}
