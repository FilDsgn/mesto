import { handleImageClick } from '../utils/utils.js';

class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const card = document
    .querySelector('#card-item-template')
    .content.querySelector('.element')
    .cloneNode(true);

    return card;
  }

  _setData() {
    const titleElement = this._newCard.querySelector('.element__title');
    titleElement.textContent = this._name;

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    const buttonDelete = this._newCard.querySelector('.element__delete');
    buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });

    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    })

    this._imageElement.addEventListener('click', () => {
      handleImageClick(this._name, this._link);
    })
  }
  

  getView() {
    this._newCard = this._getTemplate();

    this._imageElement = this._newCard.querySelector('.element__image');
    this._buttonLike = this._newCard.querySelector('.element__like');

    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;