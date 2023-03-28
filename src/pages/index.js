import './index.css';
import initialCards from "../utils/cards.js";
import validationConfig from "../utils/validationConfig.js";
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupCardFormOpenButton,
  profileEditButton,
  formValidators
} from '../utils/constants.js';


const popupImage = new PopupWithImage('.popup_type_image');
const popupProfile = new PopupWithForm('.popup_type_profile-form', submitProfileForm);
const popupCard = new PopupWithForm('.popup_type_card-form', submitCardForm);
const userInfo = new UserInfo('.profile__name', '.profile__job');
const sectionPhotoGrid = new Section({
  data: initialCards,
  renderer: (item) => {
    sectionPhotoGrid.addItem(createCard(item));
  }
}, '.photo-grid__list');

function createCard(cardData) {
  const card = new Card(cardData, '.template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function openProfileForm() {
  popupProfile.setDefaultImputValues(userInfo.getUserInfo());
  formValidators['profile-form'].resetValidation();
  popupProfile.open();
}

function submitProfileForm(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValues());
  popupProfile.close();
}

function openCardForm() {
  popupCard.open();
  formValidators['card-form'].resetValidation();
}

function submitCardForm(evt) {
  evt.preventDefault();
  const cardData = popupCard.getInputValues();
  sectionPhotoGrid.addItem(createCard(cardData))
  popupCard.close();
  formValidators['card-form'].resetValidation();
}

function handleCardClick(link, title) {
  popupImage.open(link, title);
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

function setEventListeners() {
  popupImage.setEventListeners();
  popupProfile.setEventListeners();
  popupCard.setEventListeners();
  profileEditButton.addEventListener ('click', openProfileForm);
  popupCardFormOpenButton.addEventListener('click', openCardForm);
}

sectionPhotoGrid.renderItems();
setEventListeners();
enableValidation(validationConfig);
