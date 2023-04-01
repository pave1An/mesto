import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._acceptButton = this._popup.querySelector('.popup__button');
  }

  setAcceptAction(func) {
    this._handleAccept = func;
  }

  setEventListeners() {
    super.setEventListeners();
    this._acceptButton.addEventListener('click', () => this._handleAccept());
  }
}


