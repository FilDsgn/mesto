import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handlerFormSubmit) {
    super(selector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._getInputValues());
      this.close();
    })
  }

}