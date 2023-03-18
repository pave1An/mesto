export default class UserInfo {
  constructor(userName, infoSelector) {
    this._name = document.querySelector(userName);
    this._job = document.querySelector(infoSelector);
    this._userInfo = {};
  }


  getUserInfo() {
    this._userInfo.name = this._name.textContent;
    this._userInfo.job = this._job.textContent;
    return this._userInfo;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

}
