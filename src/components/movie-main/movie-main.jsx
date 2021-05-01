import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

export default class MovieMain extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      directors: [],
      actors: [],
      user: null,
      /* userRegistered: null, */
    };
  }

  /*   onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  } */

  getMovies(token) {
    axios
      .get('https://myvhs.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGenres(token) {
    axios
      .get('https://myvhs.herokuapp.com/genres', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          genres: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDirectors(token) {
    axios
      .get('https://myvhs.herokuapp.com/directors', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          directors: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getActors(token) {
    axios
      .get('https://myvhs.herokuapp.com/actors', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          actors: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      this.getGenres(accessToken);
      this.getDirectors(accessToken);
      this.getActors(accessToken);
    }
  }

  render() {
    const { movies } = this.state;

    return (
      <Row className='main-view justify-content-md-center pt-4'>
        {movies.map((movie) => (
          <Col sm={6} lg={3} className={'mb-4'} key={movie._id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    );
  }
}
