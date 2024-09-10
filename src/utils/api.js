class Api {
    constructor(options) {
      this._address = options.address;
      this._groupId = options.groupId
      this._token = options.token;
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
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/users/me`, {
        method: 'PATCH',
        headers: 
        {
          'Authorization':'2b046d27-e300-4552-a820-76fed2ad182a',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(this._checkResponse);
    }
  
    addCard(data) {  
      return fetch(`https://around.nomoreparties.co/v1/${this._groupId}/cards`, {
        method: 'POST',
        headers:     
        {
          'Authorization': this._token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(this._checkResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/${cardId}`, {
        method: 'DELETE',
        headers: {'Authorization':'2b046d27-e300-4552-a820-76fed2ad182a'}
      })
        .then(this._checkResponse);
    }
  
    changeLikeCardStatus(cardId, isLiked){
      if(isLiked){
        return this.dislikeCard(cardId);
      }else{
        return this.likeCard(cardId)
      }
    }
    likeCard(cardId) {
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {'Authorization':'2b046d27-e300-4552-a820-76fed2ad182a'}
      })
        .then(this._checkResponse);
    }
  
    dislikeCard(cardId) {
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {'Authorization':'2b046d27-e300-4552-a820-76fed2ad182a'}
      })
        .then(this._checkResponse);
    }
  
    updateAvatar(data) {
      data = JSON.stringify({'avatar': data})
      return fetch(`https://around.nomoreparties.co/v1/web_es_11/users/me/avatar`, {
        method: 'PATCH',
        headers:     
        {
          'Authorization': '2b046d27-e300-4552-a820-76fed2ad182a',
          "Content-Type": "application/json"
        },
        body: data
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