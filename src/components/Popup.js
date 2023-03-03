export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._button = this._popup.querySelector('.popup__button');
    this._buttonClose = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setButtonText(text) {
    this._button.textContent = text;
  }

  setEventListeners() {
    
    // Закрытие попапа по нажатию на иконку
    this._buttonClose.addEventListener('click', () => {
      this.close();
    })

    // Закрытие попапа по нажатию на оверлей
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })
  }

}