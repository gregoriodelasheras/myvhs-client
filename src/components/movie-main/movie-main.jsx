import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

export default class MovieMain extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    const { movies } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1>Movies</h1>
        <Row>
          {movies.map((movie) => (
            <Col sm={6} lg={3} className={'my-3'} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
