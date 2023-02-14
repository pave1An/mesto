const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__job');

const popupProfileForm = document.querySelector('.popup_type_profile-form');

const profileForm = popupProfileForm.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_job');

const profileEditBtn = profileElement.querySelector('.profile__edit-btn');

const closeProfileFormBtn = popupProfileForm.querySelector('.popup__close-btn');

const photoList = document.querySelector('.photo-grid__list');
const template = document.querySelector('.template')
const element = template.content.querySelector('.element')

const cardForm = document.querySelector('.popup_type_card-form');
const cardImageNameInput = cardForm.querySelector('.popup__input_type_name');
const cardImageLinkInput = cardForm.querySelector('.popup__input_type_src');
const addCardBtn = profileElement.querySelector('.profile__add-btn');

const closeCardFormBtn = cardForm.querySelector('.popup__close-btn');
const popupImage = document.querySelector('.popup_type_image');
const closePopupImageBtn = popupImage.querySelector('.popup__close-btn');
const popupImageView = popupImage.querySelector('.popup__image-view');
const popupImageName = popupImage.querySelector('.popup__image-title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  hideInputError(profileForm, profileNameInput);
  hideInputError(profileForm, profileJobInput);
  openPopup(popupProfileForm);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfileForm);
}

function openCardForm() {
  hideInputError(cardForm, cardImageNameInput);
  hideInputError(cardForm, cardImageLinkInput);
  openPopup(cardForm);
}

const removeCard = function (card) {
  return () => card.remove();
}

const like = function (click) {
  return  () => click.classList.toggle('element__like_active');
}

function createCard(cardData) {
  const card = element.cloneNode(true);
  const likeBtn = card.querySelector('.element__like');
  const image = card.querySelector('.element__image');
  const imageName = card.querySelector('.element__title');
  const trashBtn = card.querySelector('.element__trash');

  imageName.textContent = cardData.name;
  image.setAttribute('alt', cardData.name);
  image.setAttribute('src', cardData.link);
  likeBtn.addEventListener('click', like(likeBtn));
  trashBtn.addEventListener('click', removeCard(card));
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
  renderCard(cardData, photoList);
  closePopup(cardForm);
  evt.target.reset();
}

function closeCardForm() {
  cardImageNameInput.value = null;
  cardImageLinkInput.value = null;
  closePopup(cardForm);
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

initialCards.forEach(cardData => renderCard(cardData, photoList));

cardForm.addEventListener('submit', submitCardForm);
profileForm.addEventListener ('submit', submitProfileForm);
profileEditBtn.addEventListener ('click', openProfileForm);
closeProfileFormBtn.addEventListener ('click', () => closePopup(popupProfileForm));
addCardBtn.addEventListener('click', openCardForm);
closeCardFormBtn.addEventListener('click', closeCardForm);
closePopupImageBtn.addEventListener('click', closePopup.bind(null, popupImage));
