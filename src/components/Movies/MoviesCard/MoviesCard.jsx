import React from 'react';
import './MoviesCard.css';

function MoviesCard({
  data, onMovieDislike, onMovieLike, onMovieDelete, isSaved,
}) {
  const [isLiked, setIsLiked] = React.useState(data.isLiked);

  React.useEffect(() => {
    setIsLiked(data.isLiked);
  }, [data.isLiked]);

  function handleLikeClick() {
    if (isLiked) {
      setIsLiked(false);
      onMovieDislike(data);
    } else {
      setIsLiked(true);
      onMovieLike({
        country: data.country || 'не указано',
        director: data.director || 'не указано',
        duration: data.duration || 'не указано',
        description: data.description || 'не указано',
        image: data.image || 'https://images.unsplash.com/photo-1588066801004-3d2a8ef323d7',
        trailer: data.trailer || 'https://www.youtube.com',
        nameRU: data.nameRU || 'не указано',
        nameEN: data.nameEN || 'не указано',
        movieId: data.movieId,
        thumbnail: data.thumbnail,
        year: data.year,
      });
    }
  }

  function handleDeleteClick() {
    onMovieDelete(data);
  }

  function handleClick() {
    if (data.trailer) {
      window.open(data.trailer);
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
            <h2 className="movies-card-article__title">{data.nameRU}</h2>
            <p className="movies-card-article__subtitle">{duration(data.duration)}</p>
          </div>
          {isSaved
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
          <button
            className="movies-card-article__image-button"
            type="button"
            onClick={handleClick}
          >
            <img
              className="movies-card-article__image"
              src={data.image}
              alt={`фото ${data.nameRU}`}
            />
          </button>
        </div>
      </article>
    </li>

  );
}

export default MoviesCard;
