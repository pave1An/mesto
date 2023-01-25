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

let profileElement = document.querySelector(".profile");
let profileEditBtn = profileElement.querySelector(".profile__edit-btn");
let profileName = profileElement.querySelector(".profile__name");
let profileJob = profileElement.querySelector(".profile__job");

let popupElement = document.querySelector(".popup");
let popupCloseBtn = popupElement.querySelector(".popup__close-btn");

let formElement = popupElement.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input-text_type_name");
let jobInput = formElement.querySelector(".popup__input-text_type_job");

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupSwitch();
}

function openForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupSwitch();
}

function popupSwitch() {
  popupElement.classList.toggle("popup_opened");
}

profileEditBtn.addEventListener ("click", openForm);
popupCloseBtn.addEventListener ("click", popupSwitch);
formElement.addEventListener ("submit", handleFormSubmit);


const template = document.querySelector('.template')
const photoList = document.querySelector('.photo-grid__list');
//console.log(document.querySelector('.element__image'));

function createCard(name, link) {
  const card = template.content.querySelector('.element').cloneNode(true);
  const imageName = card.querySelector('.element__title');
  const imageLink = card.querySelector('.element__image');
  imageName.textContent = name;
  imageLink.setAttribute('src', link);
  return card;
}

function renderCard(name, link) {
  photoList.append(createCard(name, link));
}

initialCards.forEach(element => renderCard(element.name, element.link));

