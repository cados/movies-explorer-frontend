import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
  return (

    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="logo" /></Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="form">
          <label className="form__label" htmlFor="name">Имя</label>
          <input className="form__input" type="text" name="name" id="name" placeholder="Введите имя" />
          <label className="form__label" htmlFor="email">E-mail</label>
          <input className="form__input" type="text" name="email" id="email" placeholder="Введите email" />
          <label className="form__label" htmlFor="password">Пароль</label>
          <input className="form__input form__error_pass" type="password" name="password" id="password" placeholder="Введите пароль" />
          <p className="form__error">Что-то пошло не так...</p>
          <button className="form__button" type="submit">Зарегистрироваться</button>
          <p className="register__text">
            Уже зарегистрированы?
            <Link to="/signin" className="register__link">Войти</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
