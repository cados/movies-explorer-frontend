class MoviesApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // _responseResult(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(new Error(`Ошибка: ${res.status}`));
  // }
  _responseResult(res) {
    return res.json()
      .then((json) => {
        if (!res.ok) {
          throw json;
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
