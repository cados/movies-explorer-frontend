import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { Formik } from 'formik';
import * as yup from 'yup';

function Profile({ currentUser, onSignOut }) {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Обязательное поле'),
    email: yup.string().email('Неверный формат email').required('Обязательное поле'),
  });
  return (
    <>
      <section className="profile">
        <Formik
          initialValues={{
            name: currentUser.name,
            email: currentUser.email,
          }}
          validateOnBlur
          onSubmit={(values) => {
            // eslint-disable-next-line no-console
            console.log((values));
          }}
          validationSchema={validationSchema}
        >
          {({
            values, errors, touched, handleChange, handleBlur,
            handleSubmit,
          }) => (
            <form className="profile__form" noValidate>
              <h1 className="profile__title">Привет, {currentUser.name}!</h1>
              <fieldset className="profile-form__fieldset">
                <div className="profile-form__input-container">
                  <label className="profile-form__input-label"> Имя
                <input
                      type="text"
                      className="profile-form__input"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}

                    />
                  </label>

                </div>
                {
                  <p className={`form__error
                ${touched.name
                    && errors.name
                    && 'form__error_active'}`}
                  >{errors.name}</p>
                }
                <div className="profile-form__input-container">
                  <label className="profile-form__input-label">Почта
                  <input
                      type="text"
                      className="profile-form__input"
                      id="email"
                      name="email"
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
                </div>
              </fieldset>
              <div className="profile-form__container">
                <button
                  className="profile-edit-button"

                  onClick={handleSubmit}
                  type="submit">Редактировать
              </button>
                <Link to="/" onClick={onSignOut} className="profile-edit-button profile-edit-button_error">Выйти из аккаунта</Link>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default Profile;
