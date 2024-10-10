import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this.popup.querySelector(".form");
    this._submitButton = this.popup.querySelector(".popup__submit-button");
    this._submitButtonText = this._submitButton.value;
    this.setEventListeners();
  }

  _getInputValues() {
    const data = new FormData(this._form);
    const dataObject = Object.fromEntries(data.entries());
    return dataObject;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.value = "Salvando...";
    } else {
      this._submitButton.value = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      const inputValue = this._getInputValues();
      this._submitCallback(inputValue)
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._renderLoading(false);
        });
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
    this._renderLoading(false);
  }
}
