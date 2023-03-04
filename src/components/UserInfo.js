export default class UserInfo {
  constructor(data) {
    this._userName = data.name;
    this._userAbout = data.about;
    this._userAvatar = data.avatar;
    this._userId = data._id;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    }
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
}
