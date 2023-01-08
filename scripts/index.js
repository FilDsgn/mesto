const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonLike = document.querySelector('.element__like');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_content_profile');
const popupAddCard = document.querySelector('.popup_content_card');
const closeButton = document.querySelector('.popup__close-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__button');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');
const popupOpenCard = document.querySelector('.popup_content_image');
const popupImage = popupOpenCard.querySelector('.popup__image');
const popupImageCaption = popupOpenCard.querySelector('.popup__caption');
const formAddElement = popupAddCard.querySelector('.popup__form'); 
const locateInput = formAddElement.querySelector('.popup__input_place_locate');
const imageInput = formAddElement.querySelector('.popup__input_place_image');
const cardTitle = document.querySelector('.element__title');
const cardImage = document.querySelector('.element__image');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_place_name');
const jobInput = document.querySelector('.popup__input_place_about');
const templateCards = document.querySelector('#card-item-template');
const cardsContainer = document.querySelector('.elements__container');
const cardsMesto = cardsContainer.querySelectorAll('.element');
const templateCard = templateCards.content.querySelector('.element');


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

// Открытие редактирования профиля
function openEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileWork.textContent;
  setEventListeners(formProfile, validationConfig);
  openPopup(popupEdit);
}

// Обработчик «отправки» формы
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileWork.textContent = jobInput.value;

    closePopup(popupEdit);
}

// Создать карточку
const createCard = (cardData) => {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const buttonDelete = card.querySelector('.element__delete');
  const likeButton = card.querySelector('.element__like');

  card.querySelector('.element__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Картинка ${cardData.name} вставить`;

  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton);
  })
  
  buttonDelete.addEventListener('click', () => {
    handleDeleteCard(card);
});

  cardImage.addEventListener('click', () => {
    
    popupImage.src = cardData.link;
    popupImage.alt = `Фото ${cardData.name} вставить`;
    popupImageCaption.textContent = cardData.name;
    openPopup(popupOpenCard);
  })

  return card;
}

// Рендер карточек
const renderCards = (card) => {
  cardsContainer.prepend(createCard(card));
}

// Добавление карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  const element = {
    name: locateInput.value,
    link: imageInput.value
  }
  renderCards(element);
  evt.target.reset();
  
  closePopup(popupAddCard);
  evt.submitter.disabled = true;
  evt.submitter.classList.add(validationConfig.inactiveButtonClass);
}

// Добавление лайков
function handleLikeCard(likeButton) {
  likeButton.classList.toggle('element__like_active');
} 

// Удаление карточек
function handleDeleteCard(card) {
  card.remove();
}

// Закрытие попапов при нажатии на Escape
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
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