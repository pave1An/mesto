import initialCards from "./cards.js";
import validationConfig from "./validationConfig.js";
import Card from "./Card.js";
import FormValidator from './FormValidator.js';


const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
const popupCardFormOpenButton = profileSection.querySelector('.profile__add-btn');
const profileEditButton = profileSection.querySelector('.profile__edit-btn');

const profilePopup = document.querySelector('.popup_type_profile-form');
const profileForm = document.forms['profile-form'];
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_job');

const cardFormPopup = document.querySelector('.popup_type_card-form');
const cardForm = document.forms['card-form'];
const cardFormNameInput = cardForm.querySelector('.popup__input_type_name');
const cardFormLinkInput = cardForm.querySelector('.popup__input_type_src');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupView = imagePopup.querySelector('.popup__image-view');
const imagePopupName = imagePopup.querySelector('.popup__image-title');

const formValidators = {};
const photoGrid = document.querySelector('.photo-grid__list');
const closeButtons = Array.from(document.querySelectorAll('.popup__close-btn'));

function closePopupByClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function closePopupByEscape(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener('mousedown', closePopupByClickOnOverlay);
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
}

function openProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  formValidators['profile-form'].resetValidation();
  openPopup(profilePopup);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = cardFormNameInput.value;
  cardData.link = cardFormLinkInput.value;
  photoGrid.prepend(createCard(cardData));
  closePopup(cardFormPopup);
  evt.target.reset();
  formValidators['card-form'].resetValidation();
}

function handleCardClick(link, title) {
  imagePopupView.setAttribute('src', link);
  imagePopupView.setAttribute('alt', title);
  imagePopupName.textContent = title;
  openPopup(imagePopup);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, '.template', handleCardClick);
  return cardElement.generateCard();
}

function renderCards(cardsObject) {
  cardsObject.forEach((item) => {
    const card = createCard(item);
    photoGrid.prepend(card);
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

renderCards(initialCards);
enableValidation(validationConfig);

profileForm.addEventListener ('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);
profileEditButton.addEventListener ('click', openProfileForm);
popupCardFormOpenButton.addEventListener('click', () => openPopup(cardFormPopup));
