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
  locateInput,
  imageInput,
  nameInput,
  jobInput,
  cardListSelector,
  profileName,
  profileWork,
  profileAvatar
 } from '../utils/utils.js';


let userId;

const api = new Api(apiConfig);
console.log(api.getCardList())
console.log(api.getUserInfo())

Promise.all([api.getUserInfo(), api.getCardList()])
  .then(res => {
    const userData = res[0];
    const cardList = res[1];

    userId = userData._id;

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    cardSection.renderItems(cardList);
  })
  .catch(err => console.log(err))


api.getCardList()
  .then((res) => cardSection.renderItems(res))
  .catch((err) => console.log(err));

api.getUserInfo()
  .then((res) => {
    userInfo.getUserInfo(res);
    nameInput.value = res.name;
    jobInput.value = res.about;
  })
  .catch((err) => console.log(err));

// Попап с фото
const popupWithImage = new PopupWithImage('.popup_content_image');
popupWithImage.setEventListeners();

// Создание карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '#card-item-template', handleCardClick, deleteHandler, likeHandler, userId);
  const newCard = card.getView();
  return newCard;
}

// Обработчики карточки
function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

function deleteHandler(card, cardId) {
  popupDeleteCard.open(card, cardId);
}

function likeHandler(card) {
  if (card.isLike) {
    api.deleteLike(card._cardId)
      .then((res) => {
        card.getLikes(res.likes);
        card.toggleButtonLike();
        card.toggleValueLike();
        card.toggleVisibleLikeCounter()
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.putLike(card._cardId)
      .then((res) => {
        card.getLikes(res.likes);
        card.toggleButtonLike();
        card.toggleValueLike();
        card.toggleVisibleLikeCounter()
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

function handleSubmitAddCard() {
  popupAddCard.setButtonText('Сохранение...');

  api.createCard({ name: locateInput.value, link: imageInput.value }).then((res) => {
    const newCard = createCard(res);
    cardSection.addItem(newCard);
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddCard.setButtonText('Сохраненить');
    });
}

buttonAddCard.addEventListener('click', () => {
  formCardValidator.enableValidation();
  popupAddCard.open();
  formCardValidator.resetValidation();
})

// Попап для удаления карточек
const popupDeleteCard = new PopupDelete('.popup_confirm', handleDeleteCard)
popupDeleteCard.setEventListeners();

function handleDeleteCard(card) {
  popupDeleteCard.setButtonText('Удаление...');

  api.deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupDeleteCard.setButtonText('Да');
    });
}

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_content_profile', handleSubmitEditForm);
popupEditProfile.setEventListeners();

function handleSubmitEditForm(data) {
  api.setUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.setButtonText('Сохраненить');
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
  api.setUserAvatar(data)
    .then(() => {
      userInfo.setUserAvatar(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.setButtonText('Сохраненить');
    });
}

profileAvatar.addEventListener('click', () => {
  formEditAvatarValidator.enableValidation();
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
