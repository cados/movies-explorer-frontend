import React from 'react';
import './Navigation.css';
import './menu.css';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import profileIcon from '../../images/icon-main.svg';

function Navigation() {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  function handleClickMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  const menuClass = classnames({
    menu: true,
    menu_active: menuIsOpen,
  });
  const navigationClass = classnames({
    navigation: true,
    navigation_active: menuIsOpen,
  });
  const overlayClass = classnames({
    menu__overlay: true,
    menu__overlay_active: menuIsOpen,
  });
  return (
    <>
      <div onClick={handleClickMenu} className={menuClass}>
        <span className="menu_midline"></span>
      </div>
      <div onClick={handleClickMenu} className={overlayClass}></div>
      <div className="navigation_container">
        <nav className={navigationClass}>
          <NavLink exact to="/" onClick={handleClickMenu} activeClassName="navigation__link_active" className="navigation__link navigation__link_main"> Главная</NavLink>
          <NavLink to="/movies" onClick={handleClickMenu} activeClassName="navigation__link_active" className="navigation__link">Фильмы</NavLink>
          <NavLink to="/saved-movies" onClick={handleClickMenu} activeClassName="navigation__link_active" className="navigation__link">Сохранённые фильмы</NavLink>
          <Link onClick={handleClickMenu} className="navigation__account navigation__account_menu" to="/profile">
            Аккаунт
            <img
              className="header__icon"
              src={profileIcon}
              alt="лого профиля"
            />
          </Link>
        </nav>
        <Link className="navigation__account" to="/profile">
          Аккаунт
          <img
            className="header__icon"
            src={profileIcon}
            alt="лого профиля"
          />
        </Link>
      </div>
    </>
  );
}

export default Navigation;
