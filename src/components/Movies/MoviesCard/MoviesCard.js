import React from 'react';
import './MoviesCard.css';
import classnames from 'classnames';
import savedIcon from '../../../images/savedIcon.svg';

function MoviesCard(props) {
  const [saved, setSeved] = React.useState(false);
  const savedClass = classnames({
    movies__favorite: true,
    movies__favorite_saved: saved,
  });

  function savedClick() {
    setSeved(!saved);
  }

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
            <img className={savedClass} src={savedIcon} alt="Добавить в избранное" />
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

export default MoviesCard;
