import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this._baseUrl = props.baseUrl;
    this._headers = props.headers;
  }

  _customFetch = (url, headers) => {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  };

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  updateUserImage(data) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: data.avatar }),
    });
  }

  updateProfile({ name, about }) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addCard(data) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  removeCard(cardID) {
    return this._customFetch(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardID, isLiked) {
    return this._customFetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: `${isLiked ? "PUT" : "DELETE"}`,
    });
  }
}

const api = new Api({
  baseUrl: "https://api.around-project.students.nomoreparties.sbs",
  headers: {
    authorization: "439544b2-326e-4000-bd7d-7d8ec93af705",
    "Content-Type": "application/json",
  },
});

export default api;
