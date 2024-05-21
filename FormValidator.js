export class FormValidator {
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
    console.log(isFormValid);
    if (isFormValid) {
      submitButtonElement.removeAttribute("disabled");
      submitButtonElement.classList.remove("button_inactive");
    } else {
      submitButtonElement.setAttribute("disabled", "disabled");
      submitButtonElement.classList.add("button_inactive");
    }
  }

  /*_showInputError(formElement, inputElement, errorMessage) {
    const _errorElement = formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add("form__input-error_active");
  }

  _hideInputError(formElement, inputElement) {
    const _errorElement = formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    _errorElement.classList.remove("form__input-error_active");
    _errorElement.textContent = "";
  }

  _checkInputValidity() {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }*/
}
