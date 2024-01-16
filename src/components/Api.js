export default class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleOriginal(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
  }
    return res.json();
  }

  _getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._handleOriginal(res));
  }

  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._handleOriginal(res))
  }

  getAppInfo() {
    return Promise.all([this._getInitialCards(), this._getUserInfo()]);
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._handleOriginal(res));
  }

  deleteCard(CardId) {
    return fetch(`${this._baseUrl}/cards/${CardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._handleOriginal(res));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleOriginal(res));
  }

  changeUserPicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => this._handleOriginal(res));
  }

  addLikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._handleOriginal(res));
  }

  deleteLikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleOriginal(res));
  }

}
