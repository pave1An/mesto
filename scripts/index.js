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
const profileEditBtn = profileElement.querySelector('.profile__edit-btn');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__job');

const popupProfileForm = document.querySelector('.popup__profile-form');
const closeProfileFormBtn = popupProfileForm.querySelector('.popup__close-btn');

const profileForm = popupProfileForm.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('.popup__input-text_type_name');
const profileJobInput = profileForm.querySelector('.popup__input-text_type_job');

const addCardBtn = profileElement.querySelector('.profile__add-btn');
const cardForm = document.querySelector('.popup__card-form');
const closeCardFormBtn = cardForm.querySelector('.popup__close-btn');
const cardImageNameInput = cardForm.querySelector('.popup__input-text_type_name');
const cardImageLinkInput = cardForm.querySelector('.popup__input-text_type_src');

const template = document.querySelector('.template')
const photoList = document.querySelector('.photo-grid__list');

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  switchPopup(popupProfileForm);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const imageName = cardImageNameInput.value;
  const imageLink = cardImageLinkInput.value;
  renderCard(imageName, imageLink);
  switchPopup(cardForm);
  evt.target.reset();
}

function closeCardForm() {
  cardImageNameInput.value = null;
  cardImageLinkInput.value = null;
  switchPopup(cardForm);
}

function openProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  popupProfileForm.classList.toggle('popup_opened');
}

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
}

function createCard(name, link) {
  const card = template.content.querySelector('.element').cloneNode(true);
  const imageName = card.querySelector('.element__title');
  const imageLink = card.querySelector('.element__image');
  imageName.textContent = name;
  imageLink.setAttribute('src', link);
  return card;
}

function renderCard(name, link) {
  photoList.prepend(createCard(name, link));
}

initialCards.forEach(element => renderCard(element.name, element.link));

profileEditBtn.addEventListener ('click', openProfileForm);
addCardBtn.addEventListener('click', switchPopup.bind(null, cardForm));

closeProfileFormBtn.addEventListener ('click', switchPopup.bind(null, popupProfileForm));
profileForm.addEventListener ('submit', submitProfileForm);

closeCardFormBtn.addEventListener('click', closeCardForm);
cardForm.addEventListener('submit', submitCardForm);
