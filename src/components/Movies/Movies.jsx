import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import ButtonMore from '../ButtonMore/ButtonMore';
import filterFilms from '../../utils/filterFilms';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import getMaxMoviesToShow from '../../utils/getMaxMoviesToShow';
import defineIncrement from '../../utils/defineIncrement';
import adaptMovieObjects from '../../utils/adaptMovieObjects';

function Movies({ showError }) {
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [visibleMovies, setVisibleMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [movieLimit, setMovieLimit] = React.useState(getMaxMoviesToShow(window.innerWidth));
  const [increment, setIncrement] = React.useState(defineIncrement(window.innerWidth));
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    function handleWindowResize() {
      setMovieLimit(getMaxMoviesToShow(window.innerWidth));
      setIncrement(defineIncrement(window.innerWidth));
    }
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  React.useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        setLikedMovies(movies);
      })
      .catch((error) => showError(error));
  }, []);

  React.useEffect(() => {
    // Получаем сохраненные фильмы из localStorage
    const storedMovies = JSON.parse(localStorage.getItem('storedMovies'));
    if (storedMovies) {
      // Фильтруем фильмы в соответствии с количеством фильмов для показа
      const filteredMovies = storedMovies
        .slice(0, movieLimit)
        .map((movie) => {
          // Проверяем, понравился ли фильм пользователю
          const isMovieLiked = likedMovies.some((el) => el.movieId === movie.movieId);
          // Добавляем новое свойство isLiked к фильму
          return { ...movie, isLiked: isMovieLiked };
        });
      // Устанавливаем отфильтрованные фильмы в состояние filteredMovies
      setFilterMovies(filteredMovies);
      // Устанавливаем отфильтрованные фильмы в состояние visibleMovies
      setVisibleMovies(filteredMovies);
    }
  }, [likedMovies, movieLimit]);

  function handleMovieSearch(query, isShortMovie) {
    setIsLoading(true);

    moviesApi.getInitialMovies()
      .then((movies) => {
        // Фильтруем фильмы
        const filteredMovies = filterFilms(movies, query, isShortMovie);
        // Адаптируем фильмы
        const adaptedMovies = adaptMovieObjects(filteredMovies);
        // Отображаем фильмы
        const moviesToShow = adaptedMovies
          .slice(0, movieLimit)
          .map((movie) => {
            // Проверяем, понравился ли фильм пользователю
            const isMovieLiked = likedMovies.some((el) => el.movieId === movie.movieId);
            // Добавляем новое свойство isLiked к фильму
            return { ...movie, isLiked: isMovieLiked };
          });
        // Устанавливаем отфильтрованные и адаптированные фильмы в состояние filterMovies
        setFilterMovies(adaptedMovies);
        // Устанавливаем отображаемые фильмы в состояние visibleMovies
        setVisibleMovies(moviesToShow);
        // Сохраняем адаптированные фильмы в localStorage
        localStorage.setItem('storedMovies', JSON.stringify(adaptedMovies));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // Отображаем ошибку
        showError({ message: `Во время запроса произошла ошибка: ${error.message}` });
        // Устанавливаем пустые списки фильмов
        setFilterMovies([]);
        setVisibleMovies([]);
      });
  }

  function handleMovieLike(movie) {
    mainApi.likeMovie(movie)
      .then((newMovie) => {
        setLikedMovies([...likedMovies, newMovie]);
      })
      .catch((error) => showError(error));
  }

  function handleMovieDislike(movie) {
    const movieToDelete = likedMovies.find((el) => el.movieId === movie.movieId);
    if (!movieToDelete) {
      return;
    }
    mainApi.dislikeMovie(movieToDelete._id)
      .then((dislikedMovie) => {
        const updatedLikedMovies = likedMovies.filter((el) => el._id !== dislikedMovie._id);
        setLikedMovies(updatedLikedMovies);
      })
      .catch((error) => showError({ message: `Не удалось удалить фильм из списка понравившихся: ${error.message}` }));
  }

  function handleButtonMoreClick() {
    const limit = Math.min(filterMovies.length, visibleMovies.length + increment);
    const newMovies = filterMovies
      .slice(visibleMovies.length, limit)
      .map((movie) => {
        const isMovieLiked = likedMovies.some((el) => el.movieId === movie.movieId);
        return { ...movie, isLiked: isMovieLiked };
      });
    setVisibleMovies([...visibleMovies, ...newMovies]);
  }

  return (
    <section className="movies">
      <SearchForm
        searchCallBack={handleMovieSearch}
      />
      {
        isLoading
          ? <Preloader />
          : (
            <MoviesCardList
              movies={visibleMovies}
              onMovieLike={handleMovieLike}
              onMovieDislike={handleMovieDislike}
              isSaved={false}
            />
          )
      }
      {filterMovies.length > visibleMovies.length
        && <ButtonMore onClick={handleButtonMoreClick} />}
    </section>
  );
}

export default Movies;
