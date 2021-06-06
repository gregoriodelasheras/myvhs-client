import React from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../config';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col, Spinner } from 'react-bootstrap';

// Rendering genre components: 1. genre-main -> 2. genres-list -> 3. genre-card -> * 4. genre-view
export default class GenreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: [],
      movies: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { genreID } = this.props.match.params;

    const genresResponse = await axiosInstance.get(`/genres/${genreID}`);
    const moviesResponse = await axiosInstance.get('/movies');

    const [genres, movies] = await Promise.all([
      genresResponse,
      moviesResponse,
    ]);

    this.setState({
      genre: genres.data,
      movies: movies.data,
      loading: false,
    });
  }

  render() {
    let { genre, movies, loading } = this.state;
    let moviesMatched = [];

    // Shows the movies that belong to the genre
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
            <div className='genre-image'>
              <img src={genre.imagePath} className='film-image mt-5 mb-3 p-3' />
            </div>
            <div className='genre-name my-4'>
              <h1 className='value'>{genre.name}</h1>
            </div>
            <div className='genre-description my-4'>
              <span className='value font-italic'>{genre.description}</span>
            </div>
            <div className='my-4'>
              <p className='label h3 font-weight-bold'>Movies</p>
            </div>
            {loading && (
              <Spinner animation='border' variant='info' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            )}
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
