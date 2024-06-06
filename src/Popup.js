export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    this.popup.classList.add("popup__opened");
    document.addEventListener("keydown", this._handleEscClose);
    this.popup.addEventListener("mousedown", this._handleOverlayClick);
  }

  close() {
    this.popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this.popup.removeEventListener("mousedown", this._handleOverlayClick);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === this.popup) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
