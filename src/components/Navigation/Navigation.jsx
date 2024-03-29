import React from 'react';
import './Navigation.css';
import './menu.css';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import profileIcon from '../../images/icon-main.svg';

function Navigation() {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const handleClickMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

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
      <div
        onClick={handleClickMenu}
        onKeyDown={handleClickMenu}
        role="button"
        tabIndex={0}
        className={menuClass}
      >
        <span className="menu_midline" />
      </div>
      <div
        onClick={handleClickMenu}
        onKeyDown={handleClickMenu}
        role="button"
        tabIndex={0}
        className={overlayClass}
        aria-label="Переключить меню"
      />
      <div className="navigation_container">
        <nav className={navigationClass}>
          <NavLink
            exact
            to="/"
            onClick={handleClickMenu}
            activeClassName="navigation__link_active"
            className="navigation__link navigation__link_main"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            onClick={handleClickMenu}
            activeClassName="navigation__link_active"
            className="navigation__link"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={handleClickMenu}
            activeClassName="navigation__link_active"
            className="navigation__link"
          >
            Сохранённые фильмы
          </NavLink>
          <Link
            to="/profile"
            onClick={handleClickMenu}
            className="navigation__account navigation__account_menu"
          >
            Аккаунт
            <img
              className="header__icon"
              src={profileIcon}
              alt="лого профиля"
            />
          </Link>
        </nav>
        <Link
          to="/profile"
          className="navigation__account"
        >
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
