class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleClickOnTrashButton() {
    return () => this._card.remove();
  }

  _handleClickOnLikeButton() {
    return () => this._cardLikeButton.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._cardTrashButton.addEventListener('click', this._handleClickOnTrashButton());
    this._cardLikeButton.addEventListener('click', this._handleClickOnLikeButton());
    this._image.addEventListener('click',() => this._handleCardClick(this._cardLink, this._cardName));
  }

  generateCard() {
    this._card = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._cardTrashButton = this._card.querySelector('.element__trash');
    this._cardLikeButton = this._card.querySelector('.element__like');
    this._imageTitle = this._card.querySelector('.element__title');
    this._image = this._card.querySelector('.element__image');

    this._setEventListeners();

    this._imageTitle.textContent = this._cardName;
    this._image.setAttribute('src', this._cardLink);
    this._image.setAttribute('alt', this._cardName);

    return this._card;
  }
}

export default Card;
