import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(selector, handlerDeleteSubmit) {
    super(selector);
    this._handlerDeleteSubmit = handlerDeleteSubmit;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerDeleteSubmit(this._card);
      super.close();
    })
  }
}