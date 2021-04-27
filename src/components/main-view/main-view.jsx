import React from 'react';
import axios from 'axios';

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
      <div className='main-view'>
        {selectedMovie ? (
          <MovieView
            movieData={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieData={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
