
export default class UserInfo {
  constructor({nameTextSelector, jobTextSelector, avatarUserSelector}) {
    this._nameElementSelector = nameTextSelector;
    this._jobElementSelector = jobTextSelector;
    this._avatarUserSelector = avatarUserSelector;
    this._nameElement = document.querySelector(this._nameElementSelector);
    this._jobElement = document.querySelector(this._jobElementSelector);
    this._avatarElement = document.querySelector(this._avatarUserSelector);
  }


  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    }
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.about;
    this._avatarElement.src = data.avatar;
  }
}