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

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
}





// export default class UserInfo {
//   constructor({ nameSelector, infoSelector }) {
//     this._userName = document.querySelector(nameSelector);
//     this._userInfo = document.querySelector(infoSelector);
//   }

//   getUserInfo() {
//     return {
//       name: this._userName.textContent,
//       about: this._userInfo.textContent
//     }
//   }

//   setUserInfo({ name, about }) {
//     this._userName.textContent = name;
//     this._userInfo.textContent = about;
//   }
// }