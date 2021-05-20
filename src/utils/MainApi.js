class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _responseResult(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => { throw err; });
  }

  register(data) {
    return fetch(`${this.url}/signup`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => this._responseResult(res));
    // .catch((err) => { throw err; });
  }

  authorize(data) {
    return fetch(`${this.url}/signin`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => this._responseResult(res));
    // .catch((err) => { throw err; });
  }

  checkToken(token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._responseResult(res));
    // .catch((err) => { throw err; });
  }
}

const mainApi = new MainApi({
  url:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default mainApi;
