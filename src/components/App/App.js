import React from 'react';
import './App.css';
import {
  Route, Switch, Redirect, useRouteMatch, useHistory,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Registration from '../Register/Register';
import Profile from '../Profile/Profile';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';

function App() {
  const [loginIn, setloginIn] = React.useState(true);
  const [currentUser, setCarrentUser] = React.useState({});

  const history = useHistory();

  const handleSignUp = (data) => {
    setCarrentUser({
      name: 'Имя',
      email: data.email,
    });
    setloginIn(true);
    history.push('/movies');
  };

  const handleSignOut = () => {
    setloginIn(false);
  };

  const handleSignIn = () => {
    setloginIn(true);
  };

  const routesPathsHeaderArray = [
    '/signin',
    '/signup',
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
        <Header
          loggedIn={loginIn}
        />
      )}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <ProtectedRoute
          exact
          loggedIn={loginIn}
          path="/movies"
          component={Movies}
        />
        <ProtectedRoute
          exact
          path="/saved-movies"
          loggedIn={loginIn}
          component={SavedMovies}
        />
        <Route exact path="/signup">
          <Registration
            onLogIn={handleSignUp} />
        </Route>
        <Route
          exact
          path="/signin">
          <Login
            onLogIn={handleSignIn} />
        </Route>
        <ProtectedRoute
          exact
          path="/profile"
          loggedIn={loginIn}
          component={Profile}
          onSignOut={handleSignOut}
          currentUser={currentUser}
        />
        <Route exact path="/404">
          <NotFound />
        </Route>
        <Route
          exact
          path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
      {useRouteMatch(routesPathsFooterArray) ? null : <Footer />}
    </>
  );
}

export default App;
