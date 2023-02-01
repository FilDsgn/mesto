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

    const imageElement = this._newCard.querySelector('.element__image');
    imageElement.src = this._link;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _likeCard() {
    this._newCard.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _setEventListeners() {
    const deleteButton = this._newCard.querySelector('.element__delete');
    deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    const likeButton = this._newCard.querySelector('.element__like');
    likeButton.addEventListener('click', () => {
      this._likeCard();
    })
  }
  

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;