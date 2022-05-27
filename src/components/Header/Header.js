import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, onClick }) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="лого" />
      </Link>
      {loggedIn ? (
        <Navigation />
      ) : (
        <nav className="header__nav">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
          <Link
            className="header__button"
            onClick={onClick}
            to="/signin"
          >
            Войти
          </Link>
        </nav>
      )}

    </header>
  );
}

export default Header;
