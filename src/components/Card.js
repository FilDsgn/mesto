export default class Card {
  constructor(data, templateSelector, handleCardClick, deleteHandler, likeHandler, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;

    this._template = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick;
    this._deleteHandler = deleteHandler;
    this._likeHandler = likeHandler;
    this._userId = userId;

    this.isLike = false;
    this._likes = data.likes;
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

  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
    this._imageElement = null;
    this._buttonLike = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._deleteHandler(this, this._cardId);
    });

    this._buttonLike.addEventListener('click', () => {
      this._likeHandler(this, this._cardId);
    })

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._getCardInfo());
    })
  }

  _getCardInfo() {
    return { name: this._name, link: this._link }
  }
  
  getLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = this._likes.length;
  }

  updateLikes(likes) {
    this.getLikes(likes);
    this.toggleButtonLike();
    this.toggleValueLike();
    this.toggleVisibleLikeCounter()
  }

  toggleButtonLike() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  toggleValueLike() {
    this.isLike = !this.isLike;
  }

  toggleVisibleLikeCounter() {
    if (this._likes.length !== 0) {
      this._likeCounter.classList.add('element__like-counter_active');
    } else {
      this._likeCounter.classList.remove('element__like-counter_active');
    }
  }

  getView() {
    this._newCard = this._getTemplate();

    this._imageElement = this._newCard.querySelector('.element__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._buttonLike = this._newCard.querySelector('.element__like');
    this._buttonDelete = this._newCard.querySelector('.element__delete');
    this._likeCounter = this._newCard.querySelector('.element__like-counter');

    this._setData();
    this._setEventListeners();

    this._likeCounter.textContent = this._likes.length;

    this.toggleVisibleLikeCounter();

    if (this._likes.some(like => like._id === this._userId)) {
      this.isLike = true;
      this._buttonLike.classList.add('element__like_active');
    }

    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }

    return this._newCard;
  }
}
