import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import logo from '../../images/logo.svg';

function Login() {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Неверный формат email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
  });
  return (
    <>
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="лого" /></Link>
          <h1 className="register__title">Рады видеть!</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validateOnBlur
            validationSchema={validationSchema}
          >
            {({
              values, handleChange, handleBlur,
              errors, touched, handleSubmit,
            }) => (
              <form className="form" noValidate>
                <label className="form__label">E-mail
                  <input
                    className="form__input"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Введите email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </label>
                {
                  <p className={`form__error
                    ${touched.email
                    && errors.email
                    && 'form__error_active'}`}
                  >{errors.email}</p>
                }
                <label className="form__label">Пароль
                  <input
                    className="form__input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Введите пароль"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </label>
                {
                  <p className={`form__error
                    ${touched.password
                    && errors.password
                    && 'form__error_active'}`}
                  >{errors.password}</p>
                }
                <button
                  className="form__button"
                  type="submit"
                  onClick={handleSubmit}
                >Войти</button>
                <p className="register__text">
                  Ещё не зарегистрированы?
              <Link to="/signup" className="register__link">Регистрация</Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export default Login;
