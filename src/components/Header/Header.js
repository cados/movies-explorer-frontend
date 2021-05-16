import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="лого" />
      </Link>
      <>
        {props.loggedIn ? (
          <>
            <Navigation />
          </>
        ) : (
          <nav className="header__nav">
            <Link className="header__link" to="/signup">
              Регистрация
            </Link>
            <Link
              className="header__button"
              onClick={props.onClick}
              to="/signin"
            >
              Войти
            </Link>
          </nav>
        )}
      </>

    </header>
  );
}

export default Header;
