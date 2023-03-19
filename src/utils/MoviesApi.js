class MoviesApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _responseResult(res) {
    return res.json()
      .then((json) => {
        if (!res.ok) {
          return Promise.reject(new Error(json.message) || 'Ошибка запросв на сервер');
        }
        return json;
      });
  }

  getInitialMovies() {
    return fetch(
      `${this._url}`,
      { headers: this._headers },
    )
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
