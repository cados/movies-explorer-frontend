import React from 'react';
import './App.css';
import {
  Route, Switch, Redirect, useRouteMatch, useHistory,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext';
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
  const [currentUser, setCurrentUser] = React.useState({});
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

  // const handleSignUp = () => {
  //   localStorage.setItem('logginIn', 'true');
  //   setLoggedIn(true);
  // };

  const handleSignOut = () => {
    localStorage.removeItem('logginIn');
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          if (res._id) {
            setCurrentUser(res);
            setLoggedIn(true);
          } else {
            showPopupError(res);
          }
        })
        .catch((err) => showPopupError(err));
    }
  };

  function handleSignIn(email, password) {
    mainApi.authorize({
      email,
      password,
    })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/movies');
      })
      .then(() => {
        checkToken();
      })
      .catch((err) => showPopupError(err));
  }

  // const handleSignin = (data) => {
  //   setIsLoadingSignin(true);
  //   mainApi.authorize(data)
  //     .then((res) => {
  //       setAuthResStatus(res.status);
  //       localStorage.setItem('jwt', res.data.token);
  //       setLoggedIn(true);
  //       history.push('/movies');
  //       setOpenNotificationModal();
  //       setNotificationText(AUTH_SUCCESS_TEXTS.BASE_TEXT);
  //     })
  //     .then(() => {
  //       checkToken();
  //     })
  //     .catch((err) => {
  //       setAuthResStatus(err);
  //     })
  //     .finally(() => {
  //       setIsLoadingSignin(false);
  //     })
  // };

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        handleSignIn(email, password);
      })
      .catch((error) => {
        showPopupError(error);
        history.push('/signup');
      });
  }

  const handleUpdateUser = (data) => {
    const token = localStorage.getItem('jwt');
    mainApi.updateUser(data, token)
      .then((res) => {
        setCurrentUser(res);
      });
  };

  const infoTooltipClose = () => {
    setIsInfoTooltipOpen(false);
  };

  React.useEffect(() => {
    checkToken();
  }, [loggedIn]);

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
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              exact
              loggedIn={loggedIn}
              path="/movies"
              component={Movies}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
            />
            <Route exact path="/signup">
              {
                loggedIn
                  ? <Redirect to='/movies' />
                  : <Registration
                    onLogin={handleSignIn}
                    onRegister={handleRegister}
                  />
              }
            </Route>
            <Route exact path="/signin">
              {
                loggedIn
                  ? <Redirect to="/movies" />
                  : <Login
                    // logo={logo}
                    onLogin={handleSignIn}
                  />
              }
            </Route>
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSignOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
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
        </CurrentUserContext.Provider>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={infoTooltipClose}
          errorMessage={errorMessage}
        />
      </>
      {useRouteMatch(routesPathsFooterArray) ? null : <Footer />}
    </>
  );
}

export default App;
