import React from 'react';
import './Navigation.css';
import profileIcon from '../../images/icon-main.svg';

function Navigation() {
  return (
      <nav className="auth-navigation">
        <ul className="auth-navigation__nav-list">
          <li className="auth-navigation__nav-list-film">Фильмы</li>
          <li className="auth-navigation__nav-list-saved">Сохранённые фильмы</li>
          <li className="auth-navigation__nav-list-account"><a href="profile" className="auth-navigation__link">Аккаунт<img src={profileIcon} className="auth-navigation__nav-list-item-img"></img></a></li>
        </ul>
      </nav>
  );
}

export default Navigation;
