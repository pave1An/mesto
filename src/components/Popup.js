export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-btn');
    this._acceptButton = this._popup.querySelector('.popup__button');
    this._closeEscBound = this._handleEscClose.bind(this);
    this._initialAcceptButtonText = '';
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeEscBound);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeEscBound);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  renderSaving(value) {
    if(value) {
      this._initialButtonText = this._acceptButton.textContent;
      this._acceptButton.textContent = 'Сохранение...';
    } else {
      this._acceptButton.textContent = this._initialButtonText;
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
  }
}
