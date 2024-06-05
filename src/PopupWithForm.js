import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this.popup.querySelector(".form");
    this.setEventListeners();
  }

  _getInputValues() {
    const data = new FormData(this._form);
    const dataObject = Object.fromEntries(data.entries());
    return dataObject;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValue = this._getInputValues(evt.target);
      this._submitCallback(inputValue);
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
