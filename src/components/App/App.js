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
  const [infoToolsTipText, setInfoToolsTipText] = React.useState({
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
    status: false,
  });

  const history = useHistory();

  const handleFail = (message, res) => {
    if (res === true) {
      setInfoToolsTipText({
        text: message.message,
        status: true,
      });
    } else {
      setInfoToolsTipText({
        text: message.message,
        status: false,
      });
    }
    setIsInfoTooltipOpen(true);
  };

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
            handleFail(res);
          }
        })
        .catch((err) => handleFail(err));
    }
  };

  const handleSignIn = (data) => {
    mainApi.authorize({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/movies');
      })
      .then(() => {
        checkToken();
      })
      .catch((err) => handleFail(err));
  };

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
                    onFail={handleFail} />
              }

            </Route>
            <Route exact path="/signin">
              {
                // <Login
                // onLogIn={handleSignIn} />
                loggedIn
                  ? <Redirect to="/movies" />
                  : <Login
                    // logo={logo}
                    // login={initialAuth}
                    // onFail={handleFail}
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
          infoContent={infoToolsTipText}
        />
      </>
      { useRouteMatch(routesPathsFooterArray) ? null : <Footer />}
    </>
  );
}

export default App;
