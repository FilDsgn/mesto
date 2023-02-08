
class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  // Показать ошибку
  _showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
  }

  // Скрыть ошибку
  _hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
  }

  // Проверка валидности
  _checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, config);
    } else {
      this._showInputError(formElement, inputElement, config);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Переключение состояний кнопки
  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, this._config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(inputList, buttonElement, config);
      })
    })
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._config.formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement, this._config);
    })
  }
}

export default FormValidator;


