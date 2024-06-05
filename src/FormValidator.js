export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    const inputs = this._formElement.querySelectorAll(
      this._config.inputSelector
    );
    this._toggleButtonState();
    inputs.forEach((input, index) => this._setEventListeners(input, index));
  }

  _setEventListeners(input, index) {
    input.addEventListener("input", () => {
      const isValid = input.checkValidity();
      const errorElement = input.parentNode.querySelectorAll(
        this._config.errorSelector
      );
      this._toggleButtonState();
      if (isValid) {
        errorElement[index].classList.remove(this._config.errorClass);
        input.classList.remove(this._config.inputErrorClass);
        errorElement[index].textContent = "";
      } else {
        errorElement[index].textContent = input.validationMessage;
        errorElement[index].classList.add(this._config.errorClass);
        input.classList.add(this._config.inputErrorClass);
      }
    });
  }

  _toggleButtonState() {
    const submitButtonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    const isFormValid = this._formElement.checkValidity();
    if (isFormValid) {
      submitButtonElement.removeAttribute("disabled");
      submitButtonElement.classList.remove("button_inactive");
    } else {
      submitButtonElement.setAttribute("disabled", "disabled");
      submitButtonElement.classList.add("button_inactive");
    }
  }
}
