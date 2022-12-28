let profileElement = document.querySelector(".profile");
let profileName = profileElement.querySelector(".profile__name");
let profileJob = profileElement.querySelector(".profile__job");
let profileEditBtn = profileElement.querySelector(".profile__edit-btn");
let formElement = document.querySelector(".popup");
let formCloseBtn = formElement.querySelector(".popup__close-btn");
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
  formElement.classList.toggle("popup_opened");
}

profileEditBtn.addEventListener ("click", openForm);
formCloseBtn.addEventListener ("click", popupSwitch);
formElement.addEventListener ("submit", handleFormSubmit);
