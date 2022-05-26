import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import useFormWithValidation from '../../utils/FormValidator';
import { currentUserContext } from '../context/CurrentUserContext';

function Profile(props) {
  const currentUser = React.useContext(currentUserContext);
  const validator = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: 'name' in validator.values ? validator.values.name : currentUser.name,
      email: 'email' in validator.values ? validator.values.email : currentUser.email,
    });
  }

  function handleLogOut() {
    localStorage.clear();
    props.onLogOut(false);
  }

  return (
    <section className="profile">
      <form
        className="profile__form"
        onReset={validator.resetForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <fieldset className="profile-form__fieldset">
          <div className="profile-form__input-container">
            <label className="profile-form__input-label">
              {' '}
              Имя
              <input
                type="text"
                className="profile-form__input"
                id="name"
                name="name"
                minLength="1"
                maxLength="30"
                pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$"
                required
                defaultValue={currentUser.name}
                onChange={validator.handleChange}
              />
            </label>
          </div>
          <span
            className={`form__error ${validator.errors.name && validator.errors.name.length > 0 && 'form__error_active'}`}
          >
            {' '}
            {validator.errors.name}
          </span>
          <div className="profile-form__input-container">
            <label className="profile-form__input-label">
              Почта
              <input
                type="text"
                className="profile-form__input"
                id="email"
                name="email"
                defaultValue={currentUser.email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                onChange={validator.handleChange}
              />
            </label>
            <span className={`form__error ${validator.errors.email && validator.errors.email.length > 0 && 'form__error_active'}`}>
              {validator.errors.email}
            </span>
          </div>
        </fieldset>
        <div className="profile-form__container">
          <button
            className="profile-edit-button"
            disabled={!validator.isValid}
            type="submit"
          >
            Редактировать
          </button>
          <Link
            to="/signin"
            onClick={handleLogOut}
            className="profile-edit-button profile-edit-button_error"
          >
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </section>
  );
}
export default Profile;
