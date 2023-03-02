import initialCards from "./cards.js";
import validationConfig from "./validationConfig.js";
import Card from "./Card.js";
import FormValidator from './FormValidator.js';

const photoGrid = document.querySelector('.photo-grid__list');

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
const popupCardFormOpenButton = profileSection.querySelector('.profile__add-btn');
const profileEditButton = profileSection.querySelector('.profile__edit-btn');

const popupProfileForm = document.querySelector('.popup_type_profile-form');
const profileFormCloseButton = popupProfileForm.querySelector('.popup__close-btn');
const profileForm = popupProfileForm.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_job');

const popupCardForm = document.querySelector('.popup_type_card-form');
const cardFormSubmitButton = popupCardForm.querySelector('.popup__button');
const cardImageNameInput = popupCardForm.querySelector('.popup__input_type_name');
const cardImageLinkInput = popupCardForm.querySelector('.popup__input_type_src');
const cardFormCloseButton = popupCardForm.querySelector('.popup__close-btn');

const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
const popupImageView = popupImage.querySelector('.popup__image-view');
const popupImageName = popupImage.querySelector('.popup__image-title');

function closePopupByClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function closePopupByEscape(evt) {
  const openedPopup = document.querySelector('.popup_opened');

  if(evt.key === 'Escape') {
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

function cleanInputsInvalidStyle(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));

  inputList.forEach((input) => {
    form.querySelector(`.${input.id}-error`).textContent = '';
    input.classList.remove('popup__input_type_error');
  });
}

function openProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  cleanInputsInvalidStyle(popupProfileForm);
  openPopup(popupProfileForm);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfileForm);
}

function openCardForm() {
  cardFormSubmitButton.disabled = true;
  cardFormSubmitButton.classList.add('popup__button_disabled');
  openPopup(popupCardForm);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = cardImageNameInput.value;
  cardData.link = cardImageLinkInput.value;
  const card = new Card(cardData, '.template');
  photoGrid.prepend(card.generateCard());
  closePopup(popupCardForm);
  evt.target.reset();
}

function closeCardForm() {
  cardImageNameInput.value = null;
  cardImageLinkInput.value = null;
  cleanInputsInvalidStyle(popupCardForm);
  closePopup(popupCardForm);
}

function openPopupImage(evt) {
  if (evt.target.classList.contains('element__image')) {
    const imageTitle = evt.target.parentElement.querySelector('.element__title');

    popupImageView.setAttribute('src', evt.target.src);
    popupImageView.setAttribute('alt', imageTitle.textContent);
    popupImageName.textContent = imageTitle.textContent;
    openPopup(popupImage);
    popupImage.classList.add('popup_background_dark');
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  photoGrid.prepend(card.generateCard());
});

formList.forEach((formElement) => {
  const form = new FormValidator(validationConfig, formElement);
  form.enableValidation();
});

popupCardForm.addEventListener('submit', submitCardForm);
profileForm.addEventListener ('submit', submitProfileForm);
profileEditButton.addEventListener ('click', openProfileForm);
profileFormCloseButton.addEventListener ('click', () => closePopup(popupProfileForm));
popupCardFormOpenButton.addEventListener('click', openCardForm);
cardFormCloseButton.addEventListener('click', closeCardForm);
photoGrid.addEventListener('click', openPopupImage);
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
