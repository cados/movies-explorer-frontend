import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/FormValidator';
import logo from '../../images/logo.svg';

function Register({ onRegister }) {
  const validator = useFormWithValidation();
  function handleSubmit(event) {
    event.preventDefault();
    onRegister(validator.values.name, validator.values.email, validator.values.password);
    event.target.parentNode.reset();
  }

  return (
    <>
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="Изображение логотипа" /></Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form
            className="form"
            onSubmit={handleSubmit}
            onReset={validator.resetForm}
          >
            <label className="form__label">Имя
              <input
                className="form__input"
                type="text"
                name="name"
                id="name"
                minLength="2"
                maxLength="30"
                pattern="^[a-zA-Zа-яА-Я\-\s]*$"
                required
                placeholder="Введите имя"
                onChange={validator.handleChange}
              />
            </label>
            <p className={`form__error ${!validator.isValid && 'form__error_active'}`}
            >{validator.errors.name} </p>
            <label className="form__label">E-mail
              <input
                className="form__input"
                type="text"
                name="email"
                id="email"
                placeholder="Введите email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                onChange={validator.handleChange}
              />
            </label>
            <p className={`form__error ${!validator.isValid && 'form__error_active'}`}
            >{validator.errors.email}</p>
            <label className="form__label">
              Пароль
              <input
                className="form__input"
                type="password"
                name="password"
                id="password"
                placeholder="Введите пароль"
                minLength="5"
                maxLength="10"
                required
                onChange={validator.handleChange}
              />
            </label>
            <p className={`form__error ${!validator.isValid && 'form__error_active'}`}
            >{validator.errors.password}</p>
            <button
              className="form__button"
              type="submit"
              disabled={!validator.isValid}
              onClick={handleSubmit}
            >
              Зарегистрироваться
            </button>
            <p className="register__text">
              Уже зарегистрированы?
              <Link to="/signin" className="register__link">Войти</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
