class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _responseResult(res) {
    return res.json()
      .then((json) => {
        if (!res.ok) {
          throw json;
        }
        return json;
      });
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._responseResult(res));
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then((res) => this._responseResult(res))
      .then((data) => {
        localStorage.setItem('token', data.token);
        return data;
      });
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._responseResult(res));
  }

  updateUser(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => this._responseResult(res));
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => this._responseResult(res));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => this._responseResult(res));
  }

  likeMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(movie),
    })
      .then((res) => this._responseResult(res));
  }

  dislikeMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => this._responseResult(res));
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
