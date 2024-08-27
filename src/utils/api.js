class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    getInitialCards() {
      //return fetch(this._baseUrl, {
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards`, {
      //headers: this._headers
      headers: {'Authorization':'2b046d27-e300-4552-a820-76fed2ad182a'}  
    })
        .then(this._checkResponse);
    }

    getUserInfo() {
      //return fetch(`${this._baseUrl}`, {
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/users/me`, {  
      //headers: this._headers
      headers: {'Authorization':'2b046d27-e300-4552-a820-76fed2ad182a'}
      })
        .then(this._checkResponse);
    }
  
    setUserInfo(data) {
      return fetch(`${this._baseUrl}`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._checkResponse);
    }
  
    addCard(data) {
      console.log(`URL: ${this._baseUrl}`)
      console.log(`HEADERS: ${this._headers}`)
      console.log(`BODY: ${JSON.stringify(data)}`)
  
      return fetch(`${this._baseUrl}`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._checkResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    likeCard(cardId) {
      return fetch(`${this._baseUrl}`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    dislikeCard(cardId) {
      return fetch(`${this._baseUrl}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    updateAvatar(data) {
      return fetch(`${this._baseUrl}`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._checkResponse);
    }
  }
  
  

const api = new Api({
    address: 'https://nomoreparties.co',
    groupId: `web_es_11`,
    token: `2b046d27-e300-4552-a820-76fed2ad182a`,
});


export default api;