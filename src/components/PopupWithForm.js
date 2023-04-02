import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  setDefaultImputValues(userData) {
    const userDataArray = Object.values(userData);
    this._inputs.forEach(item => {
      item.value = userDataArray.shift();
    });
  }

  _getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => {
      const inputName = input.getAttribute('name');
      inputsValues[inputName] = input.value;
    });

    return inputsValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderSaving(true)
      this._submitForm(this._getInputValues())
      .catch(err => console.log(`Ошибка: ${err.status}`))
      .finally(() => this.renderSaving(false));
    });
  }
}
