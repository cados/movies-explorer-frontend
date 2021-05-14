import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from './MoviesCard/MoviesCard';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import movieList from '../../utils/Movies.json';
import Preloader from './Preloader/Preloader';

function Movies() {
  const [currentMovieList, setCurrentMovieList] = React.useState(movieList);
  const [isLoadingData, setIsLoadingData] = React.useState(true);
  function searchFilter(searchText) {
    setCurrentMovieList(movieList.filter((movie) => movie
      .nameRU.toUpperCase()
      .indexOf(searchText.toUpperCase()) > -1));
  }

  React.useEffect(() => {
    const loadingDataTimeout = setTimeout(() => {
      setIsLoadingData(false);
    }, 1500);

    return () => {
      clearTimeout(loadingDataTimeout);
    };
  }, []);

  return (
    <section className="movies">
      <SearchForm
        title="Фильмы"
        search={searchFilter}
      />
      {isLoadingData ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movieList={currentMovieList}
          component={MoviesCard}
        />
      )}
    </section>
  );
}

export default Movies;
