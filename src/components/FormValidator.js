import { config } from "../utils/constants.js";

export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage, inputErrorClass, inputVisibleClass) {
    const errorElement = inputElement.closest(this._config.popupFieldSelector).querySelector(this._config.errorSelector);

    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(inputVisibleClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement, inputErrorClass, inputVisibleClass) {
    const errorElement = inputElement.closest(this._config.popupFieldSelector).querySelector(this._config.errorSelector);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(inputVisibleClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, this._config.inputErrorClass, this._config.inputErrorVisibleClass)
    } else {
      this._hideInputError(inputElement, this._config.inputErrorClass, this._config.inputErrorVisibleClass)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _onDisabledSubmit(buttonElement, buttonDisabledClass) {
    buttonElement.classList.add(buttonDisabledClass);
    buttonElement.setAttribute('disabled', true);
  }

  _offDisabledSubmit(buttonElement, buttonDisabledClass) {
    buttonElement.classList.remove(buttonDisabledClass);
    buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._onDisabledSubmit(buttonElement, config.inactiveButtonClass);
    } else {
      this._offDisabledSubmit(buttonElement, config.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    const buttonElement = this._formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetErrorElement() {
    const  inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, this._config.inputErrorClass, this._config.inputErrorVisibleClass);
      this._toggleButtonState(inputList, buttonElement);
    });
  }
}


