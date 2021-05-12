import React from 'react';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <ul className="card">
      <li>
        <article className="movies-card-article">
          <div className="movies-card-article__header">
            <div className="movies-card-article__text-container">
              <h2 className="movies-card-article__title">33 слова о дизайне</h2>
              <p className="movies-card-article__subtitle">1ч 1м</p>
            </div>
            <div className="movies-card-article__favorite-button" aria-label="Добавить в избранное"></div>
          </div>
          <div className="movies-card-article__image-section">
            <a href="" aria-label="" target="_blank">
              <img className="movies-card-article__image" src="../../../images/pic_5.jpg" alt="фильм" />
            </a>
          </div>
        </article>
      </li>
      <li>
        <article className="movies-card-article">
          <div className="movies-card-article__header">
            <div className="movies-card-article__text-container">
              <h2 className="movies-card-article__title">33 слова о дизайне</h2>
              <p className="movies-card-article__subtitle">1ч 1м</p>
            </div>
            <div className="movies-card-article__favorite-button" aria-label="Добавить в избранное"></div>
          </div>
          <div className="movies-card-article__image-section">
            <a href="" aria-label="" target="_blank">
              <img className="movies-card-article__image" src="../../../images/pic_5.jpg" alt="фильм" />
            </a>
          </div>
        </article>
      </li>
      <li>
        <article className="movies-card-article">
          <div className="movies-card-article__header">
            <div className="movies-card-article__text-container">
              <h2 className="movies-card-article__title">33 слова о дизайне</h2>
              <p className="movies-card-article__subtitle">1ч 1м</p>
            </div>
            <div className="movies-card-article__favorite-button" aria-label="Добавить в избранное"></div>
          </div>
          <div className="movies-card-article__image-section">
            <a href="" aria-label="" target="_blank">
              <img className="movies-card-article__image" src="../../../images/pic_5.jpg" alt="фильм" />
            </a>
          </div>
        </article>
      </li>
      <li>
        <article className="movies-card-article">
          <div className="movies-card-article__header">
            <div className="movies-card-article__text-container">
              <h2 className="movies-card-article__title">33 слова о дизайне</h2>
              <p className="movies-card-article__subtitle">1ч 1м</p>
            </div>
            <div className="movies-card-article__favorite-button" aria-label="Добавить в избранное"></div>
          </div>
          <div className="movies-card-article__image-section">
            <a href="" aria-label="" target="_blank">
              <img className="movies-card-article__image" src="../../../images/pic_5.jpg" alt="фильм" />
            </a>
          </div>
        </article>
      </li>
    </ul>
  );
}

export default MoviesCard;
