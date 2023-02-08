const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_content_profile');
const popupAddCard = document.querySelector('.popup_content_card');
const popupOpenCard = document.querySelector('.popup_content_image');
const popupImage = popupOpenCard.querySelector('.popup__image');
const popupImageCaption = popupOpenCard.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const formAddElement = popupAddCard.querySelector('.popup__form'); 
const locateInput = formAddElement.querySelector('.popup__input_place_locate');
const imageInput = formAddElement.querySelector('.popup__input_place_image');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_place_name');
const jobInput = document.querySelector('.popup__input_place_about');
const cardsContainer = document.querySelector('.elements__container');
const profileFormSubmitButton = formProfile.querySelector('.popup__button');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// Закрытие попапов при нажатии на Escape
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Открытие попапа с изображением
function handleImageClick(name, link) {
  openPopup(popupOpenCard);
  popupImage.src = link;
  popupImage.alt = `Фото ${name} вставить`;
  popupImageCaption.textContent = name;
}

export { 
  validationConfig,
  handleImageClick,
  openPopup,
  closePopup,
  closePopupEsc,
  buttonEditProfile,
  buttonAddCard,
  popups,
  popupEdit,
  popupAddCard,
  closeButtons,
  profileName,
  profileWork,
  formAddElement,
  locateInput,
  imageInput,
  formProfile,
  nameInput,
  jobInput,
  cardsContainer,
  profileFormSubmitButton
 };