import '../pages/index.css';

import { initialCards } from '../utils/cards.js';

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from "../components/FormValidator.js";
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

// Рендер карточки
function renderCard(cardItem) {
  const card = new Card(cardItem, '#card-item-template', (cardInfo) => {
    popupWithImage.open(cardInfo);
  });
  const cardElement = card.getView();
  cardList.addItem(cardElement);
}

// Добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: renderCard
}, cardListSelector);

cardList.renderItems();


// Информация профиля
const userInfo = new UserInfo({nameSelector : '.profile__name', infoSelector: '.profile__work'});


// Валидация форм
const formEditModalWindow = document.querySelector('.popup__form_profile');
const formCardModalWindow = document.querySelector('.popup__form_card');

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

  renderCard(cardData);
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
  
  const {name, about} = userInfo.getUserInfo()

  nameInput.value = name;
  jobInput.value = about;


  popupEditProfile.open();
  formEditValidator.resetValidation();
});

