class Card {
  constructor(cardData, templateSelector) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._templateSelector = templateSelector;
  }

  _handleClickOnTrashButton(card) {
    return () => card.remove();
  }

  _handleClickOnLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _setEventListeners(card) {
    const cardTrashButton = card.querySelector('.element__trash');
    const cardLikeButton = card.querySelector('.element__like');

    cardTrashButton.addEventListener('click', this._handleClickOnTrashButton(card));
    cardLikeButton.addEventListener('click', this._handleClickOnLikeButton);
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners(this._card);

    this._card.querySelector('.element__title').textContent = this._cardName;
    this._card.querySelector('.element__image').setAttribute('src', this._cardLink);
    this._card.querySelector('.element__image').setAttribute('alt', this._cardName);

    return this._card;
  }
}

export default Card;
