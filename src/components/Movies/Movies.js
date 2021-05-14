import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from './MoviesCard/MoviesCard';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import movieList from '../../utils/Movies.json';

function Movies() {
  const [currentMovieList, setCurrentMovieList] = React.useState(movieList);
  function searchFilter(searchText) {
    setCurrentMovieList(movieList.filter((movie) => movie
      .nameRU.toUpperCase()
      .indexOf(searchText.toUpperCase()) > -1));
  }
  return (
    <section className="movies">
      <SearchForm
        title="Фильмы"
        search={searchFilter}
      />
      <MoviesCardList
        movieList={currentMovieList}
        component={MoviesCard}
      />
    </section>
  );
}

export default Movies;
