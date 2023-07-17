import { BASE_URL, MOVIE_URL } from "./constants.js";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Err: ${res.status}`);
};

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async _request(path, method, headers, body) {
    const res = await fetch(`${this._baseUrl}${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  }

  getInitialCards(token) {
    const path = "/users/me";
    const method = "GET";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return this._request(path, method, headers);
  }

  getUserInfo() {
    const path = "/users/me";
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    };
    return this._request(path, method, headers);
  }

  setUserInfo({ name, email }) {
    const path = "/users/me";
    const method = "PATCH";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    const body = { name, email };
    return this._request(path, method, headers, body);
  }

  saveMovie(movieData) {
    const path = "/movies";
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    const body = {
      description: movieData.description,
      director: movieData.director,
      duration: movieData.duration,
      country: movieData.country,
      nameRU: movieData.nameRU,
      nameEN: movieData.nameEN,
      year: movieData.year,
      thumbnail: `${MOVIE_URL}${movieData.image.url}`,
      trailerLink: movieData.trailerLink,
      image: `${MOVIE_URL}${movieData.image.url}`,
      movieId: movieData.id,
    };

    return this._request(path, method, headers, body)
      .then((newMovie) => {
        return newMovie;
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }

  getSavedMovies() {
    const path = "/movies";
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    return this._request(path, method, headers);
  }

  deleteMovie({ id }) {
    const path = `/movies/${id}`;
    const method = "DELETE";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    return this._request(path, method, headers);
  }
}

const mainApi = new MainApi(BASE_URL);

export default mainApi;
