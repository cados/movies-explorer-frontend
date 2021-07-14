import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import ButtonMore from '../ButtonMore/ButtonMore';
import filterFilms from '../../utils/filterFilms';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import defineAmountMoviesToShow from '../../utils/defineAmountMoviesToShow';
import defineIncrement from '../../utils/defineIncrement';
import adaptObject from '../../utils/adaptObject';

function Movies(props) {
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [visibleMovies, setVisibleMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  // eslint-disable-next-line max-len
  const [amountMoviesToShow, setAmountMoviesToShow] = React.useState(defineAmountMoviesToShow(window.innerWidth));
  const [increment, setIncrement] = React.useState(defineIncrement(window.innerWidth));
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    function handleWindowResize() {
      setAmountMoviesToShow(defineAmountMoviesToShow(window.innerWidth));
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
      .catch((error) => props.showError(error));
  }, [props]);

  React.useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('storedMovies'));

    if (movies != null) {
      const moviesToShow = [];
      for (let i = 0; i < (Math.min(movies.length, amountMoviesToShow)); i += 1) {
        const isMovieLiked = likedMovies.filter((el) => el.movieId === movies[i].movieId);
        moviesToShow.push({ ...movies[i], isLiked: isMovieLiked.length > 0 });
      }
      setFilterMovies(movies);
      setVisibleMovies(moviesToShow);
    }
  }, [likedMovies, amountMoviesToShow]);

  function handleMovieSearch(query, isShortMovie) {
    setIsLoading(true);

    moviesApi.getInitialMovies()
      .then((movies) => {
        const filterItems = filterFilms(movies, query, isShortMovie);
        const adaptItems = adaptObject(filterItems);
        const moviesToShow = [];
        for (let i = 0; i < (Math.min(adaptItems.length, amountMoviesToShow)); i += 1) {
          const isMovieLiked = likedMovies.filter((el) => el.movieId === adaptItems[i].movieId);
          moviesToShow.push({ ...adaptItems[i], isLiked: isMovieLiked.length > 0 });
        }
        setFilterMovies(adaptItems);
        setVisibleMovies(moviesToShow);
        localStorage.setItem('storedMovies', JSON.stringify(adaptItems));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        props.showError({ message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' });
        setFilterMovies([]);
        setVisibleMovies([]);
      });
  }

  function handleMovieLike(movie) {
    mainApi.likeMovie(movie)
      .then((newMovie) => {
        setLikedMovies([...likedMovies, newMovie]);
      })
      .catch((error) => props.showError(error));
  }

  function handleMovieDislike(movie) {
    const movieToDelete = likedMovies.filter((el) => el.movieId === movie.movieId);
    mainApi.dislikeMovie(movieToDelete[0]._id)
      .catch((error) => props.showError(error));
  }

  function handleButtonMoreClick() {
    const limit = Math.min(filterMovies.length, visibleMovies.length + increment);
    const arr = [];

    for (let i = visibleMovies.length; i < limit; i += 1) {
      const isMovieLiked = likedMovies.filter((el) => el.movieId === filterMovies[i].movieId);
      arr.push({ ...filterMovies[i], isLiked: isMovieLiked.length > 0 });
    }
    setVisibleMovies([...visibleMovies, ...arr]);
  }

  return (
    <section className="movies">
      <SearchForm
        searchCallBack={handleMovieSearch}
      />
      {
        isLoading
          ? <Preloader />
          : <MoviesCardList
            movies={visibleMovies}
            onMovieLike={handleMovieLike}
            onMovieDislike={handleMovieDislike}
            isSaved={false}
          />
      }
      {filterMovies.length > visibleMovies.length
        && <ButtonMore onClick={handleButtonMoreClick} />
      }
    </section>
  );
}

export default Movies;
