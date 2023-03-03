
export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`)
  }

  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then((res) => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._checkResponse(res))
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._checkResponse(res))
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }
}
