import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/FormValidator';
import logo from '../../images/logo.svg';

function Login({ onLogin }) {
  const validator = useFormWithValidation();

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(validator.values.email, validator.values.password);
    event.target.parentNode.reset();
  }
  return (
    <>
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="лого" /></Link>
          <h1 className="register__title">Рады видеть!</h1>
          <form
            className="form"
            action="post"
            onSubmit={handleSubmit}
            onReset={validator.resetForm}
          >
            <label className="form__label">E-mail
              <input
                className="form__input"
                type="text"
                name="email"
                id="email"
                placeholder="Введите email"
                minLength="2"
                maxLength="30"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                onChange={validator.handleChange}
              />
            </label>
            {
              <p className={`form__error ${!validator.isValid && 'form__error_active'}`}
              >{validator.errors.email}  </p>
            }
            <label className="form__label">Пароль
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
            {
              <p className={`form__error ${!validator.isValid && 'form__error_active'}`}
              >{validator.errors.password}</p>
            }
            <button
              className="form__button"
              type="submit"
              disabled={!validator.isValid}
              onClick={handleSubmit}
            >Войти</button>
            <p className="register__text">
              Ещё не зарегистрированы?
              <Link to="/signup" className="register__link">Регистрация</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
