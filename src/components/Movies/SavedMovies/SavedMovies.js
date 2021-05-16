import React from 'react';
import './SavedMovies.css';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movieList from '../../../utils/Movies.json';
import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';

function SavedMovies() {
  const [currentMovieList, setCurrentMovieList] = React.useState(movieList);
  function searchFilter(searchText) {
    setCurrentMovieList(movieList.filter((movie) => movie
      .nameRU.toUpperCase()
      .indexOf(searchText.toUpperCase()) > -1));
  }

  return (
    <section className="movies">
      <SearchForm
        title="Сохранённые фильмы"
        search={searchFilter}
      />
      <MoviesCardList
        movieList={currentMovieList}
        component={SavedMoviesCard}
      />
    </section>
  );
}

export default SavedMovies;
