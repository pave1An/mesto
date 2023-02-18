const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
const popupCardOpenButton = profileSection.querySelector('.profile__add-btn');
const profileEditButton = profileSection.querySelector('.profile__edit-btn');

const popupProfileForm = document.querySelector('.popup_type_profile-form');
const profileFormCloseButton = popupProfileForm.querySelector('.popup__close-btn');
const profileForm = popupProfileForm.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_job');

const photoGrid = document.querySelector('.photo-grid__list');

const template = document.querySelector('.template')
const templateElement = template.content.querySelector('.element')

const popupCardForm = document.querySelector('.popup_type_card-form');
const cardForm = popupCardForm.querySelector('.popup__form');
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
const openedPopup = document.querySelector('.popup_opened')

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

function openProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  toggleButtonState(profileForm, validationConfig)
  hideInputError(profileForm, profileNameInput, validationConfig);
  hideInputError(profileForm, profileJobInput, validationConfig);
  openPopup(popupProfileForm);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfileForm);
}

function openCardForm() {
  toggleButtonState(cardForm, validationConfig)
  hideInputError(cardForm, cardImageNameInput, validationConfig);
  hideInputError(cardForm, cardImageLinkInput, validationConfig);
  openPopup(popupCardForm);
}

const removeCard = function (card) {
  return () => card.remove();
}

const like = function (evt) {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
}

function createCard(cardData) {
  const card = templateElement.cloneNode(true);
  const likeButton = card.querySelector('.element__like');
  const image = card.querySelector('.element__image');
  const imageName = card.querySelector('.element__title');
  const trashButton = card.querySelector('.element__trash');

  imageName.textContent = cardData.name;
  image.setAttribute('alt', cardData.name);
  image.setAttribute('src', cardData.link);
  trashButton.addEventListener('click', removeCard(card));
  image.addEventListener('click', openPopupImage(cardData));

  return card;
}

function renderCard(cardData, container) {
  container.prepend(createCard(cardData));
}

function submitCardForm(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = cardImageNameInput.value;
  cardData.link = cardImageLinkInput.value;
  renderCard(cardData, photoGrid);
  closePopup(popupCardForm);
  evt.target.reset();
}

function closeCardForm() {
  cardImageNameInput.value = null;
  cardImageLinkInput.value = null;
  closePopup(popupCardForm);
}

function openPopupImage(cardData) {
  return () => {
    popupImageView.setAttribute('src', cardData.link);
    popupImageView.setAttribute('alt', cardData.name);
    popupImageName.textContent = cardData.name;
    openPopup(popupImage);
    popupImage.classList.add('popup_background_dark');
  }
}

initialCards.forEach(cardData => renderCard(cardData, photoGrid));

photoGrid.addEventListener('click', like);
popupCardForm.addEventListener('submit', submitCardForm);
profileForm.addEventListener ('submit', submitProfileForm);
profileEditButton.addEventListener ('click', openProfileForm);
profileFormCloseButton.addEventListener ('click', () => closePopup(popupProfileForm));
popupCardOpenButton.addEventListener('click', openCardForm);
cardFormCloseButton.addEventListener('click', closeCardForm);
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
