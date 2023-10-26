class Api {
  constructor({url, headers}) {
    this._url= url;
    this._headers= headers;
    this._authorizationToken = headers.authorization;
  }

  _getResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorizationToken,
        },
      })
      .then(res => this._getResponse(res));
    }

  getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorizationToken,
        },
      })
      .then(res => this._getResponse(res));
    }

    changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        }),
      })
      .then(this._getResponse);
    }

    editUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),

      })
      .then(this._getResponse);
    }

    addNewCard(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      })
      .then(this._getResponse);
    }


    deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponse);
    }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponse);
  }

    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponse);
    }

}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: 'ec5cea19-08b8-48a2-8256-e2c1e9bb4820',
    'Content-Type': 'application/json'
  }
});

export default api;