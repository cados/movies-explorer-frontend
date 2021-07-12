import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const [isLiked, setIsLiked] = React.useState(props.isLiked);
  React.useEffect(() => {
    setIsLiked(props.isLiked);
  }, [props.isLiked]);

  function handleLikeClick() {
    if (isLiked) {
      setIsLiked(false);
      props.onMovieDislike(props);
    } else {
      setIsLiked(true);
      props.onMovieLike({
        country: props.country || 'не указано',
        director: props.director || 'не указано',
        duration: props.duration || 'не указано',
        description: props.description || 'не указано',
        image: props.image || 'https://images.unsplash.com/photo-1588066801004-3d2a8ef323d7',
        trailer: props.trailer || 'https://www.youtube.com',
        nameRU: props.nameRU || 'не указано',
        nameEN: props.nameEN || 'не указано',
        movieId: props.movieId,
        thumbnail: props.thumbnail,
        year: props.year,
      });
    }
  }

  function handleDeleteClick() {
    props.onMovieDelete(props);
  }

  function handleClick() {
    if (props.trailer !== '') {
      window.open(props.trailer);
    }
  }

  function duration(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;

    if (mins < 60) {
      return `${minutes}м`;
    }
    return `${hours}ч ${minutes}м`;
  }

  return (

    <li>
      <article className="movies-card-article">
        <div className="movies-card-article__header">
          <div className="movies-card-article__text-container">
            <h2 className="movies-card-article__title">{props.nameRU}</h2>
            <p className="movies-card-article__subtitle">{duration(props.duration)}</p>
          </div>
          {props.isSaved
            ? <button
              className="movies-card-article__favorite-button movies-card-article__favorite-button-saved"
              type="button"
              onClick={handleDeleteClick}
              aria-label="Удалить из избранного"
            >
            </button>
            : <button
              className={`movies-card-article__favorite-button ${isLiked ? 'movies-card-article__favorite-button-saved' : 'movies-card-article__favorite-button'}`}
              type="button"
              onClick={handleLikeClick}
              aria-label="Добавить в избранное"
            >
            </button>
          }
        </div>
        <div className="movies-card-article__image-section">
          <img
            className="movies-card-article__image"
            src={props.image}
            alt={`фото ${props.nameRU}`}
            onClick={handleClick}
          />
        </div>
      </article>
    </li>

  );
}

export default MoviesCard;
