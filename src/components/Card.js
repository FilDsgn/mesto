

class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = this._template
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
    this._imageElement = null;
    this._buttonLike = null;
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
      this._handleCardClick(this._getCardInfo());
    })
  }

  _getCardInfo() {
    return { name: this._name, link: this._link }
  }
  

  getView() {
    this._newCard = this._getTemplate();

    this._imageElement = this._newCard.querySelector('.element__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._buttonLike = this._newCard.querySelector('.element__like');

    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;