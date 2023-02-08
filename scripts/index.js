import { initialCards } from './cards.js';

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
  profileFormSubmitButton
 } from '../utils/utils.js';

 

// Открытие редактирования профиля
function openEditProfile() {
  formEditValidator.resetValidation();

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

const createCard = (cardData) => {
  const card = new Card(cardData);
  return card.getView();
}

// Рендер карточки
const renderCard = (cardElement) => {
  cardsContainer.prepend(createCard(cardElement));
}

// Добавление карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  renderCard({name: locateInput.value, link: imageInput.value});

  evt.target.reset();
  
  closePopup(popupAddCard);
 
  formCardValidator.resetValidation();
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
  renderCard(card);
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


const formEditModalWindow = document.querySelector('.popup_content_profile');
const formCardModalWindow = document.querySelector('.popup_content_card');

const formEditValidator = new FormValidator(validationConfig, formEditModalWindow);
const formCardValidator = new FormValidator(validationConfig, formCardModalWindow);

formEditValidator.enableValidation();
formCardValidator.enableValidation();