/* eslint-disable max-len */
import React from 'react';
import './AboutMe.css';
import photo from '../../../images/profile.jpg';

function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <h2 className="title">Студент</h2>
      <div className="aboutMe__textbox">
        <div>
          <h2 className="aboutMe__title">Артем</h2>
          <h4 className="aboutMe__subtitle">Фронтенд-разработчик, 35 лет</h4>
          <p className="aboutMe__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a
            className="aboutMe__link"
            href="https://github.com/cados"
            target="_blank" rel="noreferrer"
          >
            Github
          </a>
          <a
            className="aboutMe__link"
            href="https://facebook.com/"
            target="_blank" rel="noreferrer"
          >
            Facebook
          </a>
        </div>
        <img className="aboutMe__image" src={photo} alt="фото"></img>
      </div>
      <h5 className="aboutMe__portfolio-title">Портфолио</h5>
      <ul className="aboutMe__portfolio-list">
        <li className="aboutMe__portfolio-list-element">
          <a
            className="aboutMe__portfolio-link"
            href="https://github.com/cados/russian-travel"
            target="_blank" rel="noreferrer"
          >
            <p className="aboutMe__portfolio-text">Статичный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="aboutMe__portfolio-list-element">
          <a
            className="aboutMe__portfolio-link"
            href="https://github.com/cados/russian-travel"
            target="_blank" rel="noreferrer"
          >
            <p className="aboutMe__portfolio-text">Адаптивный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="aboutMe__portfolio-list-element">
          <a
            className="aboutMe__portfolio-link"
            href="https://github.com/cados/russian-travel"
            target="_blank" rel="noreferrer"
          >
            <p className="aboutMe__portfolio-text">Одностраничное приложение</p>
            <span>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
