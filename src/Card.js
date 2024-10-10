export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    api,
    userId,
    deletePopup
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._deletePopup = deletePopup;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    return cardTemplate.content.cloneNode(true);
  }

  _updateLikeCount() {
    if (this._element) {
      this._element.querySelector(".pictures__card-like-count").textContent =
        this._likes.length;
    } else {
      console.error(
        "Elemento do cartão não encontrado para atualizar a contagem de curtidas."
      );
    }
  }

  _deleteCard(evt) {
    this._api
      .deleteCard(this._id)
      .then(() => {
        evt.target.closest(".pictures__card").remove();
      })
      .catch((err) => console.error(`Erro ao deletar o cartão: ${err}`));
  }

  _confirmDelete(evt) {
    this._currentElement = evt.target.closest(".pictures__card");
    this._currentCardId = this._id;

    this._deletePopup.open();

    this._deletePopup.setConfirmAction(() => {
      this._api
        .deleteCard(this._currentCardId)
        .then(() => {
          this._currentElement.remove();
          this._deletePopup.close();
        })
        .catch((err) => console.error(`Erro ao excluir o cartão: ${err}`));
    });
  }

  _giveLike(evt) {
    const heart = evt.target;
    const isLiked = this._likes.some((like) => like._id === this._userId);

    const apiMethod = isLiked
      ? () => this._api.unlikeCard(this._id)
      : () => this._api.likeCard(this._id);

    apiMethod(this._id)
      .then((updatedCard) => {
        this._likes = updatedCard.likes;
        this._updateLikeCount();

        heart.setAttribute(
          "src",
          isLiked ? "./images/Like.png" : "./images/Givelike.png"
        );
      })
      .catch((err) => console.error(`Erro ao atualizar a curtida: ${err}`));
  }

  generateCard() {
    const cardElement = this._getTemplate();

    this._element = cardElement.querySelector(".pictures__card");

    const cardImage = this._element.querySelector(".pictures__card-image");

    cardImage.src = this._link;
    cardImage.alt = `Imagem de ${this._name}`;
    this._element.querySelector(".pictures__card-name").textContent =
      this._name;
    this._element.querySelector(".pictures__card-like-count").textContent =
      this._likes.length;

    this._setEventListeners(this._element);

    return this._element;
  }

  _setEventListeners(cardElement) {
    const deleteButton = cardElement.querySelector(".pictures__trash-icon");
    if (this._ownerId !== this._userId) {
      deleteButton.style.display = "none";
    } else {
      deleteButton.addEventListener("click", (evt) => this._confirmDelete(evt));
    }

    cardElement
      .querySelector(".pictures__card-like")
      .addEventListener("click", (evt) => this._giveLike(evt));
  }
}
