import React from 'react';
import './SearchForm.css';
import icon from '../../images/icon_lupa.svg';
import useFormWithValidation from '../../utils/FormValidator';

function SearchForm(props) {
  const [isChecked, setIsChecked] = React.useState(false);
  const validator = useFormWithValidation();

  function handleSubmit(event) {
    event.preventDefault();
    props.searchCallBack(validator.values.filmSearch, isChecked);
    event.target.reset();
  }

  function handleCheckboxChange(event) {
    const value = event.target.checked;
    setIsChecked(value);
  }
  return (
    <>
      <div className="search">
        <form
          className="search__form"
          onSubmit={handleSubmit}
          onReset={validator.resetForm}
        >
          <img className="search__icon" src={icon} title="search"></img>
          <input
            className="search__title"
            name="filmSearch"
            type="text"
            placeholder="Фильм"
            minLength="1"
            onChange={validator.handleChange}
            required
          />
          <button
            className="search__button"
            type="submit"
            disabled={!validator.isValid}
          >
            Найти
          </button>
        </form>
      </div>
      <span
        className={`search__error ${validator.errors.filmSearch && validator.errors.filmSearch.length > 0 && 'search__error_active'}`}>
        Нужно ввести ключевое слово
      </span>
      <div className="checkbox">
        <div className="checkbox__container">
          <input
            id="search-checkbox"
            type="checkbox"
            className="checkbox__input"
            name="shortFilm"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="search-checkbox" className="checkbox__label">Switch</label>
        </div>
        <label htmlFor="search-checkbox" className="checkbox__text">Короткометражки</label>
      </div>
    </>
  );
}

export default SearchForm;
