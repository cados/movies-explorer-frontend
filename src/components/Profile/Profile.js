import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Profile.css';

function Profile() {
  return (
    <>
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <Navigation />
      </header>
      <section className="profile">
        <form className="profile__form">
          <h1 className="profile__title">Привет, Артём!</h1>
          <fieldset className="profile-form__fieldset">
            <div className="profile-form__input-container">
            <label className="profile-form__input-label"> Имя
              <input type="text" className="profile-form__input" id="name" name="name" defaultValue="Tema" placeholder="Имя"/>
            </label>
            </div>
            <div className="profile-form__input-container">
            <label className="profile-form__input-label">Почта
              <input type="text" className="profile-form__input" id="email" name="email" defaultValue="tema@bk.ru" placeholder="Почта"/>
            </label>
            </div>
          </fieldset>
          <div className="profile-form__container">
            <button className="profile-edit-button">Редактировать</button>
            <button className="profile-edit-button profile-edit-button_red">Выйти из аккаунта</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;