import React from 'react';
import './SearchForm.css';
import icon from '../../images/icon_lupa.svg';

function SearchForm() {
  return (
    <>
      <div className="search">

        <form className="search__form">
          <img className="search__icon" src={icon} title="search" required></img>
          <input className="search__title" type="text" placeholder="Фильм" />
          <button className="search__button">Найти</button>
        </form>
      </div>
      <div className="checkbox">
        <div className="checkbox__container">
          <input id="switch" type="checkbox" className="checkbox__input" defaultChecked />
          <label htmlFor="switch" className="checkbox__label">Switch</label>
        </div>
        <label htmlFor="switch" className="checkbox__text">Короткометражки</label>
      </div>
    </>
  );
}

export default SearchForm;
