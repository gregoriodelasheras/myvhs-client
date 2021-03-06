import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Style
import Container from 'react-bootstrap/Container';
import './index.scss';

// Layouts
import Header from './components/header/header';
import Footer from './components/footer/footer';

// User
import LoginView from './components/login-view/login-view';
import RegistrationView from './components/registration-view/registration-view';
import ProfileView from './components/profile-view/profile-view';
import EditView from './components/profile-view/profile-edit';
import FavoriteView from './components/profile-view/profile-favorite';
import ToWatchView from './components/profile-view/profile-towatch';

// Movies
import MovieMain from './components/movie-main/movie-main';
import MovieView from './components/movie-view/movie-view';

// Genres
import GenreMain from './components/genre-main/genre-main';
import GenreView from './components/genre-view/genre-view';

// Directors
import DirectorMain from './components/director-main/director-main';
import DirectorView from './components/director-view/director-view';

// Actors
import ActorMain from './components/actor-main/actor-main';
import ActorView from './components/actor-view/actor-view';

// Pages
import MainView from './components/main-view/main-view';
import AboutView from './components/about-view/about-view';

// Redux Store
const store = createStore(moviesApp, devToolsEnhancer());

function MyVHSApp() {
  let accessToken = JSON.parse(localStorage.getItem('token'));
  let accessUsername = JSON.parse(localStorage.getItem('user'));
  let urlProfile = `/users/${accessUsername}`;
  let isLogged;
  let isNotLogged;

  // This function allows the user to view different parts of the page depending on whether he/she is logged in or not.
  function UserIsLogged() {
    if (accessToken) {
      isLogged = <Redirect to='/' />;
    } else isNotLogged = <Redirect to='/' />;
  }

  UserIsLogged();

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route exact path='/' component={MainView} />
            <Route exact path='/about' component={AboutView} />
            <Route exact path='/login' component={LoginView}>
              {isLogged}
            </Route>
            <Route exact path='/register' component={RegistrationView}>
              {isLogged}
            </Route>
            <Route exact path={urlProfile} component={ProfileView}>
              {isNotLogged}
            </Route>
            <Route exact path={`${urlProfile}/edit`} component={EditView}>
              {isNotLogged}
            </Route>
            <Route
              exact
              path={`${urlProfile}/favorite`}
              component={FavoriteView}>
              {isNotLogged}
            </Route>
            <Route exact path={`${urlProfile}/towatch`} component={ToWatchView}>
              {isNotLogged}
            </Route>
            <Route exact path='/movies' component={MovieMain}>
              {isNotLogged}
            </Route>
            <Route exact path='/movies/:movieID' component={MovieView}>
              {isNotLogged}
            </Route>
            <Route exact path='/genres' component={GenreMain}>
              {isNotLogged}
            </Route>
            <Route exact path='/genres/:genreID' component={GenreView}>
              {isNotLogged}
            </Route>
            <Route exact path='/directors' component={DirectorMain}>
              {isNotLogged}
            </Route>
            <Route exact path='/directors/:directorID' component={DirectorView}>
              {isNotLogged}
            </Route>
            <Route exact path='/actors' component={ActorMain}>
              {isNotLogged}
            </Route>
            <Route exact path='/actors/:actorID' component={ActorView}>
              {isNotLogged}
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<MyVHSApp />, document.getElementById('container-app'));
