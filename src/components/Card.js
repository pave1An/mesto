class Card {
  constructor(
    { name, link, userId, likes, _id, owner},
    templateSelector,
    handleCardClick,
    handleTrashClick,
    handleLikeClick
    ) {
    this._cardName = name;
    this._cardLink = link;
    this._owner = owner;
    this.likes = likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this.id = _id;
  }

  checkLike(likesArr) {
    return likesArr.some(item => item._id == this._userId)
  }

  renderLike(likesArr) {
    if(this.checkLike(likesArr)) {
      this._cardLikeButton.classList.add('element__like_active')
    } else {
      this._cardLikeButton.classList.remove('element__like_active')
    }
    this._likesNumber.textContent = likesArr.length;
  }

  deleteCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._cardTrashButton.addEventListener('click', () => this._handleTrashClick());
    this._cardLikeButton.addEventListener('click', () => this._handleLikeClick());
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
    this._likesNumber = this._card.querySelector('.element__number-of-likes');
    this._imageTitle = this._card.querySelector('.element__title');
    this._image = this._card.querySelector('.element__image');

    this._imageTitle.textContent = this._cardName;
    this._image.setAttribute('src', this._cardLink);
    this._image.setAttribute('alt', this._cardName);

    this.renderLike(this.likes);
    if(!(this._userId == this._owner._id)) {
      this._cardTrashButton.remove();
    }

    this._setEventListeners();

    return this._card;

  }
}

export default Card;
