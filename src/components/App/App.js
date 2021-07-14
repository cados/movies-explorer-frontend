import React from 'react';
import './App.css';
import {
  Route, Switch, Redirect, useRouteMatch, useHistory,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { currentUserContext } from '../context/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Registration from '../Register/Register';
import Profile from '../Profile/Profile';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import mainApi from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const history = useHistory();

  function showPopupError(error) {
    if (error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(error.validation.body.message);
    }
    setIsInfoTooltipOpen(true);
  }

  function showError(error) {
    if (error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(error.validation.body.message);
    }
  }

  React.useEffect(() => {
    const tockenCheck = () => {
      const token = localStorage.getItem('token');
      if (token) {
        mainApi.checkToken(token)
          .then(() => {
            setLoggedIn(true);
            history.push('/movies');
          })
          .catch((error) => {
            showPopupError(error);
            history.push('/signin');
          });
      }
    };
    tockenCheck();
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          showPopupError(error);
        });
    }
  }, [loggedIn]);

  function onLogin(email, password) {
    mainApi.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((error) => {
        showError(error);
      })
      .finally(setErrorMessage(''));
  }

  function onRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        history.push('/movies');
      })
      .then(() => {
        onLogin(email, password);
      })
      .catch((error) => {
        showError(error);
      });
  }

  function handleUpdateUser(userData) {
    mainApi.updateUser(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch((error) => {
        showPopupError(error);
      });
  }

  function closePopup() {
    setIsInfoTooltipOpen(false);
  }

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
          loggedIn={loggedIn}
        />
      )}
      <>
        <currentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              exact
              loggedIn={loggedIn}
              path="/movies"
              component={Movies}
              showError={showPopupError}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              showError={showPopupError}
            />
            <Route exact path="/signup">
              {
                loggedIn
                  ? <Redirect to='/movies' />
                  : <Registration
                    onRegister={onRegister}
                    errorMessage={errorMessage}
                  />
              }
            </Route>
            <Route exact path="/signin">
              {
                loggedIn
                  ? <Redirect to="/movies" />
                  : <Login
                    onLogin={onLogin}
                    errorMessage={errorMessage}
                  />
              }
            </Route>
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onLogOut={setLoggedIn}
              onUpdateUser={handleUpdateUser}
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
        </currentUserContext.Provider>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
          errorMessage={errorMessage}
        />
      </>
      {useRouteMatch(routesPathsFooterArray) ? null : <Footer />}
    </>
  );
}

export default App;
