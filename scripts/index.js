
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { 
  validationConfig,
  openPopup,
  closePopup,
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
  inputElementsEditProfile,
  profileFormSubmitButton
 } from '../utils/utils.js';


// Скрыть ошибку
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

// Открытие редактирования профиля
function openEditProfile() {
  inputElementsEditProfile.forEach((inputElement) => {
    hideInputError(formProfile, inputElement, validationConfig);
  })

  profileFormSubmitButton.classList.remove(validationConfig.inactiveButtonClass);
  profileFormSubmitButton.disabled = false;
  
  nameInput.value = profileName.textContent;
  jobInput.value = profileWork.textContent;
  
  openPopup(popupEdit);
}

// Обработчик «отправки» формы
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileWork.textContent = jobInput.value;

    closePopup(popupEdit);
}

// Рендер карточек
const renderCards = (cardData) => {
  const card = new Card(cardData);
  cardsContainer.prepend(card.getView());
}

// Добавление карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  renderCards({name: locateInput.value, link: imageInput.value});

  evt.target.reset();
  
  closePopup(popupAddCard);
 
  disableSubmitButton(popupAddCard, validationConfig);
}


// Отключение кнопки попапа
function disableSubmitButton(formElement, config) {
    const buttonElement = formElement.querySelector('.popup__button');
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}

buttonAddCard.addEventListener('click', function() {
  openPopup(popupAddCard);
})

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    const currentPopup = closeButton.closest('.popup');
    closePopup(currentPopup);
  });
})

formAddElement.addEventListener('submit', handleAddCard);

// Добавление карточек из массива
initialCards.forEach((card) => {
  renderCards(card);
})

// Закрытие попапов по нажатию на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }
  })
})


formProfile.addEventListener('submit', handleProfileFormSubmit);

buttonEditProfile.addEventListener('click', openEditProfile);


const editFormModalWindow = document.querySelector('.popup_content_profile');
const cardFormModalWindow = document.querySelector('.popup_content_card');

const editFormValidator = new FormValidator(validationConfig, editFormModalWindow);
const cardFormValidator = new FormValidator(validationConfig, cardFormModalWindow);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();