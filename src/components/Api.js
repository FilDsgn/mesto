// const handleResponse = (res) => {
//   if (res.ok) {
//     return res.json()
//   }

//   return Promise.reject(new Error('Произошла ошибка'));
// }


// export default class Api {
//   constructor(config) {
//     this._baseUrl = config.baseUrl;
//     this._headers = config.headers;
//   }

//   getCardList() {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'GET',
//       headers: this._headers
//     })
//     .then(handleResponse)
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     })
//   }
// }



export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  async createCard(card) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card)
    })

    const data = response.json();
    return data;
  }

  async deleteCard(id) {
    const response = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })

    const data = response.json();
    return data;
  }

  async getCardList() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers
    })

    const data = response.json();
    console.log(data);
    return data;
  }

  editPrifile() {

  }

  getUserInfo() {

  }
}