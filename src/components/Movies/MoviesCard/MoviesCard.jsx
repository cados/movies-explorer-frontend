import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const [isLiked, setIsLiked] = React.useState(props.data.isLiked);
  React.useEffect(() => {
    setIsLiked(props.data.isLiked);
  }, [props.data.isLiked]);

  function handleLikeClick() {
    if (isLiked) {
      setIsLiked(false);
      props.onMovieDislike(props.data);
    } else {
      setIsLiked(true);
      props.onMovieLike({
        country: props.data.country || 'не указано',
        director: props.data.director || 'не указано',
        duration: props.data.duration || 'не указано',
        description: props.data.description || 'не указано',
        image: props.data.image || 'https://images.unsplash.com/photo-1588066801004-3d2a8ef323d7',
        trailer: props.data.trailer || 'https://www.youtube.com',
        nameRU: props.data.nameRU || 'не указано',
        nameEN: props.data.nameEN || 'не указано',
        movieId: props.data.movieId,
        thumbnail: props.data.thumbnail,
        year: props.data.year,
      });
    }
  }

  function handleDeleteClick() {
    props.onMovieDelete(props);
  }

  function handleClick() {
    if (props.data.trailer !== '') {
      window.open(props.data.trailer);
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
            <h2 className="movies-card-article__title">{props.data.nameRU}</h2>
            <p className="movies-card-article__subtitle">{duration(props.data.duration)}</p>
          </div>
          {props.isSaved
            ? (
              <button
                className="movies-card-article__favorite-button movies-card-article__favorite-button-remove"
                type="button"
                onClick={handleDeleteClick}
                aria-label="Удалить из избранного"
              />
            )
            : (
              <button
                className={`movies-card-article__favorite-button ${isLiked ? 'movies-card-article__favorite-button-saved' : 'movies-card-article__favorite-button'}`}
                type="button"
                onClick={handleLikeClick}
                aria-label="Добавить в избранное"
              />
            )}
        </div>
        <div className="movies-card-article__image-section">
          <img
            className="movies-card-article__image"
            src={props.data.image}
            alt={`фото ${props.data.nameRU}`}
            onClick={handleClick}
          />
        </div>
      </article>
    </li>

  );
}

export default MoviesCard;
