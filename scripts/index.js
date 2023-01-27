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

const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__job');

const popupProfileForm = document.querySelector('.popup_type_profile-form');

const profileForm = popupProfileForm.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('.popup__input-text_type_name');
const profileJobInput = profileForm.querySelector('.popup__input-text_type_job');

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
}

function openProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  switchPopup(popupProfileForm);
}
const profileEditBtn = profileElement.querySelector('.profile__edit-btn');
profileEditBtn.addEventListener ('click', openProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  switchPopup(popupProfileForm);
}
profileForm.addEventListener ('submit', submitProfileForm);

const closeProfileFormBtn = popupProfileForm.querySelector('.popup__close-btn');
closeProfileFormBtn.addEventListener ('click', switchPopup.bind(null, popupProfileForm));

const removeCard = function (elem) {
  return () => elem.parentElement.remove();
}

const like = function (elem) {
  return  () => elem.classList.toggle('element__like_active');
}

const photoList = document.querySelector('.photo-grid__list');
const template = document.querySelector('.template')

function createCard(name, link) {
  const card = template.content.querySelector('.element').cloneNode(true);
  const likeBtn = card.querySelector('.element__like');
  const image = card.querySelector('.element__image');
  const imageName = card.querySelector('.element__title');
  const trashBtn = card.querySelector('.element__trash');

  imageName.textContent = name;
  image.setAttribute('src', link);
  likeBtn.addEventListener('click', like(likeBtn));
  trashBtn.addEventListener('click', removeCard(trashBtn));
  image.addEventListener('click', openPopupImage(name, link));

  return card;
}

function renderCard(name, link, container) {
  container.prepend(createCard(name, link));
}

initialCards.forEach(element => renderCard(element.name, element.link, photoList));

const cardForm = document.querySelector('.popup_type_card-form');
const cardImageNameInput = cardForm.querySelector('.popup__input-text_type_name');
const cardImageLinkInput = cardForm.querySelector('.popup__input-text_type_src');
const addCardBtn = profileElement.querySelector('.profile__add-btn');
addCardBtn.addEventListener('click', switchPopup.bind(null, cardForm));

function submitCardForm(evt) {
  evt.preventDefault();
  const imageName = cardImageNameInput.value;
  const imageLink = cardImageLinkInput.value;
  renderCard(imageName, imageLink, photoList);
  switchPopup(cardForm);
  evt.target.reset();
}
cardForm.addEventListener('submit', submitCardForm);

function closeCardForm() {
  cardImageNameInput.value = null;
  cardImageLinkInput.value = null;
  switchPopup(cardForm);
}
const closeCardFormBtn = cardForm.querySelector('.popup__close-btn');
closeCardFormBtn.addEventListener('click', closeCardForm);

const popupImage = document.querySelector('.popup_type_image');
const closePopupImageBtn = popupImage.querySelector('.popup__close-btn');
const popupImageView = popupImage.querySelector('.popup__image-view');
const popupImageName = popupImage.querySelector('.popup__image-title');

function openPopupImage(name,link) {
  return () => {
    popupImageView.setAttribute('src', link);
    popupImageName.textContent = name;
    switchPopup(popupImage);
    popupImage.classList.add('popup_background_dark');
  }
}

closePopupImageBtn.addEventListener('click', switchPopup.bind(null, popupImage));
