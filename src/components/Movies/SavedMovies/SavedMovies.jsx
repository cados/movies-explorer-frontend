import React from 'react';
import './SavedMovies.css';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../../utils/MainApi';
import filterFilms from '../../../utils/filterFilms';

function SavedMovies({ showError }) {
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesToShow, setMoviesToShow] = React.useState([]);

  React.useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setMoviesToShow(movies);
      })
      .catch((error) => showError(error));
  }, []);

  const handleSeach = (query, isShortMovie) => {
    const filterItems = filterFilms(savedMovies, query, isShortMovie);
    setMoviesToShow(filterItems);
  };

  const handleMovieDelete = (movie) => {
    mainApi.dislikeMovie(movie._id)
      .then((movieId) => {
        const arr = savedMovies.filter((el) => el._id !== movieId._id);
        setSavedMovies(arr);
        const arr2 = moviesToShow.filter((el) => el._id !== movieId._id);
        setMoviesToShow(arr2);
      })
      .catch((error) => showError({ message: `Не удалось удалить фильм: ${error.message}` }));
  };
  return (
    <section className="movies">
      <SearchForm
        searchCallBack={handleSeach}
      />
      <MoviesCardList
        movies={moviesToShow}
        isSaved
        onMovieDelete={handleMovieDelete}
      />
    </section>
  );
}

export default SavedMovies;
