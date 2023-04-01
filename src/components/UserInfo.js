export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userInfo = {};
  }


  getUserInfo() {
    this._userInfo.name = this._name.textContent;
    this._userInfo.job = this._about.textContent;
    return this._userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setAvatar(url) {
    this._avatar.src = url;
  }
}
