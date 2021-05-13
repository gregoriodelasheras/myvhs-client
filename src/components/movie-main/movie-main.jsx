import React from 'react';
import axios from '../../config';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

export default class MovieMain extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios
      .get('/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
