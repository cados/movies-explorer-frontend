import React from 'react';
import './App.css';
import {
  Route, Switch, Redirect, useRouteMatch,
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Registration from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';

function App() {
  const routesPathsHeaderArray = [
    '/signin',
    '/signup',
    '/profile',
    '/404',
  ];

  const routesPathsFooterArray = [
    '/signin',
    '/signup',
    '/profile',
    '/404',
  ];

  return (
      <>
      {useRouteMatch(routesPathsHeaderArray) ? null : (
        <Header />
      ) }
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/signup">
          <Registration />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/404">
          <NotFound />
        </Route>
        <Route exact path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
      {useRouteMatch(routesPathsFooterArray) ? null : <Footer />}
    </>
  );
}

export default App;
