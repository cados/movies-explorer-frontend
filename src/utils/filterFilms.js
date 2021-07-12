function filterFilms(movies, query, isShortMovie) {
  return movies.filter((el) => {
    if (isShortMovie && el.duration > 40) {
      return false;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(el)) {
      if (el[key] && el[key].toString().toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return true;
      }
    }
    return false;
  });
}

export default filterFilms;
