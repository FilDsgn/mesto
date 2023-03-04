import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(selector, handlerDeleteSubmit) {
    super(selector);
    this._handlerDeleteSubmit = handlerDeleteSubmit;
    this._button = this._popup.querySelector('.popup__button');
    this._buttonText = this._button.textContent;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerDeleteSubmit(this._card);
    })
  }
}