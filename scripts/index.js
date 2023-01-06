const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_content_profile');
const popupAddCard = document.querySelector('.popup_content_card');
const popupContainer = document.querySelector('.popup__container');
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
const formElement = document.querySelector('.popup__form'); 
const nameInput = formElement.querySelector('.popup__input_place_name');
const jobInput = formElement.querySelector('.popup__input_place_about');
const templateCards = document.querySelector('#card-item-template');
const cardsContainer = document.querySelector('.elements');
const cardsMesto = cardsContainer.querySelectorAll('.element');

profileName.textContent = 'Жак-Ив Кусто';
profileWork.textContent = 'Исследователь океана';

// Открытие попапа
function openPopup(popup) {
  enableValidation(validationConfig);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileWork.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener('click', function() {
  openPopup(popupAddCard);
})

closeButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const currentPopup = item.closest('.popup');
    closePopup(currentPopup);
  });
})

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileWork.textContent = jobInput.value;

    closePopup(popup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// Создать карточку
const createCard = (element) => {
  const card = templateCards.content.querySelector('.element').cloneNode(true);
  card.querySelector('.element__title').textContent = element.name;
  card.querySelector('.element__image').src = element.link;
  card.querySelector('.element__image').alt = `Картинка ${element.name} вставить`;

  card.querySelector('.element__like').addEventListener('click', addLike);

  card.querySelector('.element__delete').addEventListener('click', delCard)

  card.querySelector('.element__image').addEventListener('click', () => {
    
    popupImage.src = element.link;
    popupImage.alt = `Фото ${element.name} вставить`;
    popupImageCaption.textContent = element.name;
    openPopup(popupOpenCard);
  })

  return card;
}

// Рендер карточек
const renderCards = (element) => {
  cardsContainer.prepend(createCard(element));
}

// Добавление карточек из массива
initialCards.forEach((element) => {
  renderCards(element);
})

// Добавление карточки
const addCard = (evt) => {
  evt.preventDefault();
  const element = {
    name: locateInput.value,
    link: imageInput.value
  }
  renderCards(element);
  evt.target.reset();
  closePopup(popupAddCard);
}

formAddElement.addEventListener('submit', addCard);

// Добавление лайков
function addLike(evt) {
  evt.target.classList.toggle('element__like_active');
} 

// Удаление карточек
function delCard(evt) {
  evt.target.closest('.element').remove();
}


// Закрытие попапов по нажатию на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }
  })
})

// Закрытие попапов при нажатии на Escape
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

