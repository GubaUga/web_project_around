import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, name) {
    const imageElement = this.popup.querySelector(".popup__image");
    const nameElement = this.popup.querySelector(".popup__place-name");
    imageElement.src = image;
    imageElement.alt = name;
    nameElement.textContent = name;
    super.open();
  }
}
