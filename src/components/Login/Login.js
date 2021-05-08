import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="logo" /></Link>
        <h1 className="register__title">Рады видеть!</h1>
        <form className="form">
          <label className="form__label" htmlFor="email">E-mail</label>
          <input className="form__input" type="text" name="email" id="email" placeholder="Введите email" />
          <label className="form__label" htmlFor="password">Пароль</label>
          <input className="form__input" type="password" name="password" id="password" placeholder="Введите пароль" />
          <p className="form__error" />
          <button className="form__button" type="submit">Войти</button>
          <p className="register__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="register__link">Регистрация</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
