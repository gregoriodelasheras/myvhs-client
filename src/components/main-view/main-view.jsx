import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      userLogged: null,
      userRegistered: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://myvhs.herokuapp.com/movies')
      .then((response) => {
        console.log(response);
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onLoggedIn(userLogged) {
    this.setState({
      userLogged,
    });
  }

  onRegistered(userRegistered) {
    this.setState({
      userRegistered,
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie, userLogged, userRegistered } = this.state;

    if (!userLogged)
      return (
        <LoginView onLoggedIn={(userLogged) => this.onLoggedIn(userLogged)} />
      );

    if (!userRegistered)
      return (
        <RegistrationView
          onRegistered={(userRegistered) => this.onRegistered(userRegistered)}
        />
      );

    if (movies.length === 0) return <div className='main-view' />;

    return (
      <Row className='main-view justify-content-md-center pt-4'>
        {selectedMovie ? (
          <Col>
            <MovieView
              movieData={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col className='mb-4' sm={12} md={6} lg={3} key={movie._id}>
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}
