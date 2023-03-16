const filterFilms = (movies, query, isShortMovie) => movies.filter((el) => {
  if (isShortMovie && el.duration > 40) {
    return false;
  }
  return Object.values(el).some((value) => {
    if (typeof value === 'string') {
      return value.toLowerCase().includes(query.toLowerCase());
    }
    return false;
  });
});

export default filterFilms;
