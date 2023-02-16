import '../page/index.css';

import { initialCards } from './cards.js';

import Card from "./Card.js";
import Section from "./Section.js";
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from "./FormValidator.js";
import { 
  validationConfig,
  buttonEditProfile,
  buttonAddCard,
  locateInput,
  imageInput,
  nameInput,
  jobInput,
  cardListSelector
 } from '../utils/utils.js';
 
// Попап с фото
const popupWithImage = new PopupWithImage('.popup_content_image');
popupWithImage.setEventListeners();

// Добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, () => {
      popupWithImage.open(card.getCardInfo());
    });
    const cardElement = card.getView();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems();


// Информация профиля
const userInfo = new UserInfo({nameSelector : '.profile__name', infoSelector: '.profile__work'});


// Валидация форм
const formEditModalWindow = document.querySelector('.popup_content_profile');
const formCardModalWindow = document.querySelector('.popup_content_card');

const formEditValidator = new FormValidator(validationConfig, formEditModalWindow);
const formCardValidator = new FormValidator(validationConfig, formCardModalWindow);

formEditValidator.enableValidation();
formCardValidator.enableValidation();


// Попап для добавления карточек
const popupAddCard = new PopupWithForm('.popup_content_card', handleSubmitAddCard);
popupAddCard.setEventListeners();

function handleSubmitAddCard() {
  const cardData = {
    name: locateInput.value,
    link: imageInput.value
  }

  const newCard = new Card(cardData, () => {
      popupWithImage.open(newCard.getCardInfo());
  })
  const newCardElement = newCard.getView();
  cardList.addItem(newCardElement);
}

buttonAddCard.addEventListener('click', () => {
  formCardValidator.enableValidation();
  popupAddCard.open();
})

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_content_profile', handleSubmitEditForm);
popupEditProfile.setEventListeners();

function handleSubmitEditForm(value) {
  userInfo.setUserInfo(value);
  userInfo.name = nameInput.value;
  userInfo.about = jobInput.value;
}

buttonEditProfile.addEventListener('click', () => {
  
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;

  popupEditProfile.open();
  formEditValidator.resetValidation();
  console.log(userInfo.getUserInfo())
});

