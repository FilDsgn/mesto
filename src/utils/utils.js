const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_content_profile');
const popupAddCard = document.querySelector('.popup_content_card');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const profileAvatar = document.querySelector('.profile__avatar');
const formAddElement = popupAddCard.querySelector('.popup__form'); 
const locateInput = formAddElement.querySelector('.popup__input_place_locate');
const imageInput = formAddElement.querySelector('.popup__input_place_image');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_place_name');
const jobInput = document.querySelector('.popup__input_place_about');
const cardsContainer = document.querySelector('.elements__container');
const cardListSelector = '.elements__container';
const profileFormSubmitButton = formProfile.querySelector('.popup__button');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    Authorization: '594f53a9-2ef4-460f-805e-a78ca111123b',
    'Content-Type': 'application/json'
  }
}


export { 
  validationConfig,
  apiConfig,
  buttonEditProfile,
  buttonAddCard,
  popups,
  popupEdit,
  popupAddCard,
  closeButtons,
  profileName,
  profileWork,
  profileAvatar,
  formAddElement,
  locateInput,
  imageInput,
  formProfile,
  nameInput,
  jobInput,
  cardsContainer,
  profileFormSubmitButton,
  cardListSelector
 };