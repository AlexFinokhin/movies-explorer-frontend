import { BASE_URL } from "./constants.js";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Err: ${res.status}`);
};

class AuthApi {
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

  handleRegistration(name, email, password) {
    const path = "/signup";
    const method = "POST";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = { name, email, password };
    return this._request(path, method, headers, body);
  }

  handleLogIn(email, password) {
    const path = "/signin";
    const method = "POST";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = { email, password };
    return this._request(path, method, headers, body);
  }
}

const authApi = new AuthApi(BASE_URL);

export default authApi;
