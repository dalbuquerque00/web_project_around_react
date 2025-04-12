class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    setUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about,
        }),
      }).then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    addCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      }).then(this._checkResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    unlikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    updateAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      }).then(this._checkResponse);
    }
  }
  
  const api = new Api({
    baseUrl: 'https://around.nomoreparties.co/v1/group-12',
    headers: {
      authorization: '44300d4b-fe58-42de-a817-6a20b8affcdd',
      'Content-Type': 'application/json',
    },
  });
  
  export default api;