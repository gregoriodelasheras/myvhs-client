import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layouts
import Header from './components/header/header';
import Footer from './components/footer/footer';

// Style
import Container from 'react-bootstrap/Container';
import './index.scss';

// User
import LoginView from './components/login-view/login-view';
import RegistrationView from './components/registration-view/registration-view';

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

function MyVHSApp() {
  /*  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem(token);
    return token && true;
  }; */

  return (
    <Container>
      <Header />
      <Switch>
        <Route exact path='/login' component={LoginView} />
        <Route exact path='/register' component={RegistrationView} />

        <Route exact path='/movies' component={MovieMain} />
        <Route exact path='/movies/:movieID' component={MovieView} />

        <Route exact path='/genres' component={GenreMain} />
        <Route exact path='/genres/:genreID' component={GenreView} />

        <Route exact path='/directors' component={DirectorMain} />
        <Route exact path='/directors/:directorID' component={DirectorView} />

        <Route exact path='/actors' component={ActorMain} />
        <Route exact path='/actors/:actorID' component={ActorView} />
      </Switch>
      <Footer />
    </Container>
  );
}

ReactDOM.render(
  <Router>
    <MyVHSApp />
  </Router>,
  document.getElementById('app-container'),
);
