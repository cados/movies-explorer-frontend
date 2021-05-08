import React from 'react';
import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  return (
    <section className="notfound">
    <h1 className="notfound__title">404</h1>
    <p className="notfound__text">Страница не найдена</p>
    <p className="noutfound__back" onClick={history.goBack}>Назад</p>
    </section>
  );
}

export default NotFound;
