import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../utils/FormValidator';
import logo from '../../images/logo.svg';

function Register(props) {
  const validator = useFormWithValidation();
  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister(validator.values.name, validator.values.email, validator.values.password);
    event.target.reset();
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="Изображение логотипа" /></Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          className="form"
          onSubmit={handleSubmit}
          onReset={validator.resetForm}
          noValidate
        >
          <label className="form__label">
            Имя
            <input
              className="form__input"
              type="text"
              name="name"
              id="name"
              minLength="2"
              maxLength="30"
              pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$"
              required
              autoComplete="off"
              placeholder="Введите имя"
              onChange={validator.handleChange}
            />
          </label>
          <span className={`form__error ${!validator.isValid && 'form__error_active'}`}>
            {validator.errors.name}
          </span>
          <label className="form__label">
            E-mail
            <input
              className="form__input"
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Введите email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={validator.handleChange}
            />
          </label>
          <span className={`form__error ${!validator.isValid && 'form__error_active'}`}>
            {validator.errors.email}
          </span>
          <label className="form__label">
            Пароль
            <input
              className="form__input"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder="Введите пароль"
              minLength="5"
              maxLength="10"
              required
              onChange={validator.handleChange}
            />
          </label>
          <span className={`form__error ${!validator.isValid && 'form__error_active'}`}>
            {validator.errors.password}
          </span>
          {props.errorMessage
            ? (
              <span
                className="register__error register__error_active"
              >
                {props.errorMessage}
              </span>
            )
            : (
              <span
                className="register__error"
              />
            )}
          <button
            className="form__button"
            type="submit"
            disabled={!validator.isValid}
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
  );
}

export default Register;
