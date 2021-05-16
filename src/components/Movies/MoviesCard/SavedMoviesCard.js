import React from 'react';
import './MoviesCard.css';
import deleteIcon from '../../../images/delete.svg';

function SavedMoviesCard(props) {
  function savedClick() { }

  function duration(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 60 / 60);
    const minutes = Math.floor(timeInSeconds / 60) % 60;

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
          <div className="movies-card-article__favorite-button" onClick={savedClick}>
            <img src={deleteIcon} alt="Добавить в избранное" />
          </div>
        </div>
        <div className="movies-card-article__image-section">
          <a href="#" target="_blank">
            <img className="movies-card-article__image" src={props.data.image} alt={`фото ${props.data.nameRU}`} />
          </a>
        </div>
      </article>
    </li>
  );
}

export default SavedMoviesCard;
