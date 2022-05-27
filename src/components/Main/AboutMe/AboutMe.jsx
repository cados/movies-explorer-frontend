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
            Я родился в маленьком городке на Донбассе, сейчас живу в Москве .
            В свое время постигал гранит науки в  колледже, потом в институте по
            it-ым специальностям,
            но применения полученных знаний так и не нашел  в реальной жизни, хотя от
            it я никогда не отходил.
            Все время занимался фрилансом и саморазвитием. После того, как прошёл курс
            по веб-разработке я начинаю
            свой новый путь в качестве фронтенд разработчика.
          </p>
          <a
            className="aboutMe__link"
            href="https://github.com/cados"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            className="aboutMe__link"
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
        <img className="aboutMe__image" src={photo} alt="фото" />
      </div>
      <h5 className="aboutMe__portfolio-title">Портфолио</h5>
      <ul className="aboutMe__portfolio-list">
        <li className="aboutMe__portfolio-list-element">
          <a
            className="aboutMe__portfolio-link"
            href="https://github.com/cados/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="aboutMe__portfolio-text">Статичный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="aboutMe__portfolio-list-element">
          <a
            className="aboutMe__portfolio-link"
            href="https://github.com/cados/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="aboutMe__portfolio-text">Адаптивный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="aboutMe__portfolio-list-element">
          <a
            className="aboutMe__portfolio-link"
            href="https://github.com/cados/russian-travel"
            target="_blank"
            rel="noreferrer"
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
