import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="navigation-tab">
      <ul className="navigation-tab__list">
        <li className="navigation-tab__list-item">
          <a href="#aboutProject" className="navigation-tab__list-link">О проекте</a>
        </li>
        <li className="navigation-tab__list-item">
          <a href="#techs" className="navigation-tab__list-link">Технологии</a>
        </li>
        <li className="navigation-tab__list-item">
          <a href="#aboutMe" className="navigation-tab__list-link">Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
