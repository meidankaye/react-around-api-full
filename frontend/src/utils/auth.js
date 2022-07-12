export const BASE_URL = "https://api.around-project.students.nomoreparties.sbs";

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const register = (user) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: user.email, password: user.password }),
  }).then(checkResponse);
};

export const authorize = (user) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: user.email, password: user.password }),
  }).then(checkResponse);
};

export const validateToken = (token) => {
  if (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(checkResponse);
  }
};
