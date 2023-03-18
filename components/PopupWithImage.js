import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image-view');
    this._imageName = this._popup.querySelector('.popup__image-title')
  }

  open(link, title) {
    super.open();
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', title);
    this._imageName.textContent = title;
  }
}
