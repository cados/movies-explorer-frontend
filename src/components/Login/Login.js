import React from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../utils/FormValidator';
import logo from '../../images/logo.svg';

function Login(props) {
  const validator = useFormWithValidation();

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin(validator.values.email, validator.values.password);
    event.target.reset();
  }
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="лого" /></Link>
        <h1 className="register__title">Рады видеть!</h1>
        <form
          className="form"
          onSubmit={handleSubmit}
          onReset={validator.resetForm}
          noValidate
          action="post"
        >
          <label className="form__label" htmlFor="email">
            E-mail
            <input
              className="form__input"
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Введите email"
              minLength="2"
              maxLength="30"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              onChange={validator.handleChange}
            />
          </label>
          <span className={`form__error ${!validator.isValid && 'form__error_active'}`}>
            {validator.errors.email}
          </span>
          <label className="form__label" htmlFor="password">
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
            : <span className="register__error" />}

          <button
            className="form__button"
            type="submit"
            disabled={!validator.isValid}
          >
            Войти
          </button>
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
