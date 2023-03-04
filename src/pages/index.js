import '../pages/index.css';

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import FormValidator from "../components/FormValidator.js";
import Api from '../components/Api.js';
import { 
  validationConfig,
  apiConfig,
  buttonEditProfile,
  buttonAddCard,
  cardListSelector,
  profileName,
  profileWork,
  profileAvatar
 } from '../utils/utils.js';


let userId;

const api = new Api(apiConfig);



Promise.all([api.getUserInfo(), api.getCardList()])
  .then(([users, cards]) => {
    const userData = users;
    const cardList = cards;

    userId = userData._id;

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    cardSection.renderItems(cardList);
  })
  .catch(err => console.log(err))


// Попап с фото
const popupWithImage = new PopupWithImage('.popup_content_image');
popupWithImage.setEventListeners();

// Создание карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '#card-item-template', handleCardClick, handleDelete, handleLike, userId);
  const newCard = card.getView();
  return newCard;
}

// Обработчики карточки
function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

function handleDelete(card, cardId) {
  popupDeleteCard.open(card, cardId);
}

function handleLike(card) {

  if (card.isLike) {
    api.deleteLike(card._cardId)
      .then((res) => {
        card.updateLikes(res.likes)
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.putLike(card._cardId)
      .then((res) => {
        card.updateLikes(res.likes)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

// Секция с карточками
const cardSection = new Section({
  items: [],
  renderer: (cardItem) => cardSection.addItem(createCard(cardItem))
}, cardListSelector);



// Информация профиля
const userInfo = new UserInfo({name: profileName, about: profileWork, avatar: profileAvatar});
console.log(userInfo)


// Попап для добавления карточек
const popupAddCard = new PopupWithForm('.popup_content_card', handleSubmitAddCard);
popupAddCard.setEventListeners();
console.log(popupAddCard._getInputValues())

function handleSubmitAddCard(name, link) {
  popupAddCard.renderLoading(true);

  api.createCard(name, link)
    .then((res) => {
    const newCard = createCard(res);
    cardSection.addItem(newCard);
    popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
}

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
  formCardValidator.resetValidation();
})

// Попап для удаления карточек
const popupDeleteCard = new PopupDelete('.popup_confirm', handleDeleteCard)
popupDeleteCard.setEventListeners();

function handleDeleteCard(card) {
  popupDeleteCard.renderLoading(true, 'Удаление...');

  api.deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupDeleteCard.renderLoading(false);
    });
}

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_content_profile', handleSubmitEditForm);
popupEditProfile.setEventListeners();

function handleSubmitEditForm(data) {
  popupEditProfile.renderLoading(true);

  api.setUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false)
    });
}

buttonEditProfile.addEventListener('click', () => {

  popupEditProfile.setInputValues(userInfo.getUserInfo());

  popupEditProfile.open();
  formEditValidator.resetValidation();
});

// Попап редактирования аватарки
const popupEditAvatar = new PopupWithForm('.popup_update_avatar', handleSubmitEditAvatar);
popupEditAvatar.setEventListeners();

function handleSubmitEditAvatar(data) {
  popupEditAvatar.renderLoading(true);

  api.setUserAvatar(data)
    .then(() => {
      userInfo.setUserAvatar(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

profileAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  formEditAvatarValidator.resetValidation();
})



// Валидация форм
const formEditModalWindow = document.querySelector('.popup__form_profile');
const formCardModalWindow = document.querySelector('.popup__form_card');
const formEditAvatarModalWindow = document.querySelector('.popup__form_update_avatar');

const formEditValidator = new FormValidator(validationConfig, formEditModalWindow);
const formCardValidator = new FormValidator(validationConfig, formCardModalWindow);
const formEditAvatarValidator = new FormValidator(validationConfig, formEditAvatarModalWindow);

formEditValidator.enableValidation();
formCardValidator.enableValidation();
formEditAvatarValidator.enableValidation();
