import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

export default class GenreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: [],
      movies: [],
    };
  }

  async componentDidMount() {
    const { genreID } = this.props.match.params;
    const token = localStorage.getItem('token');

    const genresURL = 'https://myvhs.herokuapp.com/genres/';
    const moviesURL = 'https://myvhs.herokuapp.com/movies';

    const genresResponse = axios.get(genresURL + genreID, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const moviesResponse = axios.get(moviesURL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const [genres, movies] = await axios.all([genresResponse, moviesResponse]);

    this.setState({
      genre: genres.data,
      movies: movies.data,
    });
  }

  render() {
    let { genre, movies } = this.state;
    let moviesMatched = [];

    function ShowMovies() {
      movies.map((movie) => {
        if (movie.genre.includes(genre._id)) {
          moviesMatched.push(
            <Col sm={6} lg={3} className={'mb-4'} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>,
          );
        }
      });
    }

    ShowMovies();

    return (
      <div className='main-view'>
        <Row className='justify-content-md-center'>
          <Col className='genre-view text-center' md={8}>
            {/* <div className='genre-image'>
              <img src={genre.imagePath} className='film-image mt-5 mb-3' width={250} />
            </div> */}
            <div className='genre-name my-4'>
              <h1 className='value'>{genre.name}</h1>
            </div>
            <div className='genre-description my-4'>
              <span className='value font-italic'>{genre.description}</span>
            </div>
            <div className='my-4'>
              <p className='label h3 font-weight-bold'>Movies</p>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center'>{moviesMatched}</Row>
      </div>
    );
  }
}

GenreView.propTypes = {
  match: PropTypes.object,
};
