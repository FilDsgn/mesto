const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');

let profileName = document.querySelector('.profile__name');
let profileWork = document.querySelector('.profile__work');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileWork.textContent;
});

closeButton.addEventListener('click', closePopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}


// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); 
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_place_name');
let jobInput = formElement.querySelector('.popup__input_place_about');



// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileWork.textContent = jobInput.value;

    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

console.log({nameInput});
