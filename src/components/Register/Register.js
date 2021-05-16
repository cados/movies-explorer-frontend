import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import logo from '../../images/logo.svg';

function Register() {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Обязательное поле'),
    email: yup.string().email('Неверный формат email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
  });
  return (
    <>
      <section className="register">
        <div className="register__container">
          <Link to="/" className="register__link-logo"><img className="register__logo" src={logo} alt="лого" /></Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <Formik
            initialValues={{
              name: '',
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
                <label className="form__label">Имя
                <input
                    className="form__input"
                    type="text" name="name"
                    id="name"
                    placeholder="Введите имя"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </label>
                {
                  <p className={`form__error
                    ${touched.name
                    && errors.name
                    && 'form__error_active'}`}
                  >{errors.name}</p>
                }
                <label className="form__label">E-mail
                <input
                    className="form__input"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Введите email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email} />
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
                    className="form__input form__error_pass"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Введите пароль"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password} />
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
                >
                  Зарегистрироваться
                    </button>
                <p className="register__text">
                  Уже зарегистрированы?
                <Link to="/signin" className="register__link">Войти</Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export default Register;
