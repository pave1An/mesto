import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  setDefaultImputValues(userData) {
    const userDataArray = Object.values(userData);
    this._inputs.forEach(item => {
      item.value = userDataArray.shift();
    })
  }

  getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => {
      const inputName = input.getAttribute('name');
      inputsValues[inputName] = input.value;
    });

    return inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
