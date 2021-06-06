import React from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../config';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col, Spinner } from 'react-bootstrap';

// Rendering director components: 1. director-main -> 2. directors-list -> 3. director-card -> * 4. director-view
export default class DirectorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      director: [],
      movies: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { directorID } = this.props.match.params;

    const directorResponse = await axiosInstance.get(
      `/directors/${directorID}`,
    );
    const moviesResponse = await axiosInstance.get('/movies');

    const [director, movies] = await Promise.all([
      directorResponse,
      moviesResponse,
    ]);

    this.setState({
      director: director.data,
      movies: movies.data,
      loading: false,
    });
  }

  render() {
    let { director, movies, loading } = this.state;
    let directorDead;
    let moviesMatched = [];

    // Shows date of death if the director is dead
    function DirectorIsDead() {
      if (director.deathYear) {
        directorDead = (
          <div className='director-death'>
            <span className='label font-weight-bold'>Year of death: </span>
            <span className='value'>{director.deathYear}</span>
          </div>
        );
      }
    }

    // Shows the movies that the director has directed
    function ShowMovies() {
      movies.map((movie) => {
        if (movie.director.includes(director._id)) {
          moviesMatched.push(
            <Col sm={6} lg={3} className={'mb-4'} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>,
          );
        }
      });
    }

    DirectorIsDead();
    ShowMovies();

    return (
      <div className='main-view'>
        <Row className='justify-content-md-center'>
          <Col className='director-view text-center' md={8}>
            <div className='director-image'>
              <img src={director.imagePath} className='film-image mt-5 mb-3' />
            </div>
            <div className='director-name my-4'>
              <h1 className='value'>{director.name}</h1>
            </div>
            <div className='director-birth'>
              <span className='label font-weight-bold'>Year of birth: </span>
              <span className='value'>{director.birthYear}</span>
            </div>
            {directorDead}
            <div className='director-description my-4'>
              <span className='value font-italic'>{director.bio}</span>
            </div>
            <div className='my-4'>
              <p className='label h3 font-weight-bold'>Movies:</p>
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

DirectorView.propTypes = {
  match: PropTypes.object,
};
