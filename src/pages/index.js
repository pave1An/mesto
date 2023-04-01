import './index.css';
import validationConfig from "../utils/validationConfig.js";
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  popupCardFormOpenButton,
  profileEditButton,
  formValidators,
  avatarEditButton,
} from '../utils/constants.js';

const popupConfirmation = new PopupWithConfirmation('.popup_type_confirmation', () => {});
const popupAvatar = new PopupWithForm('.popup_type_avatar-edit', submitAvatarForm);
const popupProfile = new PopupWithForm('.popup_type_profile-form', submitProfileForm);
const popupCard = new PopupWithForm('.popup_type_card-form', submitCardForm);
const popupImage = new PopupWithImage('.popup_type_image');
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
const sectionPhotoGrid = new Section({
  data: [],
  renderer: (item) => {
    sectionPhotoGrid.addItem(createCard(item));
  }
}, '.photo-grid__list');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '5df01682-9d36-4915-9eb9-b7271e1fc542',
    'Content-Type': 'application/json'
  }
});

function renderUserInfo() {
  api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
      userInfo.setAvatar(data.avatar);
    })
    .catch(err => console.log(`Ошибка: ${err.status}`));
  }

  function addUserId(cards) {
    return api.getUserInfo()
  .then(userInfo => {
    cards.forEach(item => {
        item.userId = userInfo._id
      })
      return cards;
    })
  }

function renderInitialCards() {
  api.getInitialCards()
  .then(cards => {
    addUserId(cards)
    .then(res => {
      sectionPhotoGrid.renderItems(res);
    })
    .catch(err => console.log(`Ошибка: ${err.status}`));
  })
}

function submitAvatarForm(evt) {
  evt.preventDefault();
  popupAvatar.renderSaving(true);
  api.patchAvatar(popupAvatar.getInputValues())
  .then(res => api.handleFirstResponse(res))
  .then(data => {
    userInfo.setAvatar(data.avatar);
    popupAvatar.close();
  })
  .catch(err => console.log(`Ошибка: ${err.status}`))
  .finally(() => popupAvatar.renderSaving(false));
};

function handleTrashClick(card) {
  popupConfirmation.open();
  popupConfirmation.setAcceptAction(() => {
    popupConfirmation.renderSaving(true);
    api.deleteCard(card.id)
    .then(() => {
      card.deleteCard();
      popupConfirmation.close();
    })
    .catch(err => console.log(`Ошибка: ${err.status}`))
    .finally(() => popupConfirmation.renderSaving(false));
  });
}

function handleLikeClick(card) {
  api.clickLike(card.id, card.checkLike(card.likes))
  .then((res) => {
    card.renderLike(res.likes);
    card.likes = res.likes;
  })
  .catch(err => console.log(`Ошибка: ${err.status}`));
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    '.template',
    handleCardClick,
    () => handleTrashClick(card),
    () => handleLikeClick(card)
  );
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
  popupProfile.renderSaving(true);
  api.patchUserInfo(popupProfile.getInputValues())
  .then(res => api.handleFirstResponse(res))
  .then(data => {
    userInfo.setUserInfo(data)
    popupProfile.close();
  })
  .catch(err => console.log(`Ошибка: ${err.status}`))
  .finally(() => popupProfile.renderSaving(false));
}

function openCardForm() {
  popupCard.open();
  formValidators['card-form'].resetValidation();
}

function submitCardForm(evt) {
  evt.preventDefault();
  popupCard.renderSaving(true);
  const cardData = popupCard.getInputValues();
  api.postCard(cardData)
  .then(res => {
    res.userId = res.owner._id;
    const card = createCard(res);
    sectionPhotoGrid.addItem(card)
  })
  .catch(err => console.log(`Ошибка: ${err.status}`))
  .finally(() => {
    popupCard.renderSaving(false);
    popupCard.close();
    formValidators['card-form'].resetValidation();
  });
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
  avatarEditButton.addEventListener('click', () => popupAvatar.open());
  popupAvatar.setEventListeners();
  popupImage.setEventListeners();
  popupProfile.setEventListeners();
  popupCard.setEventListeners();
  profileEditButton.addEventListener ('click', openProfileForm);
  popupCardFormOpenButton.addEventListener('click', openCardForm);
  popupConfirmation.setEventListeners();
}

renderUserInfo()
renderInitialCards();
setEventListeners();
enableValidation(validationConfig);
