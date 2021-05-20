class MoviesApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _responseResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialMovies() {
    return fetch(`${this.url}`, { headers: this.headers })
      .then(this._responseResult);
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
