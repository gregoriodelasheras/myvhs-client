import React from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../config';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

export default class DirectorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      director: [],
      movies: [],
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
    });
  }

  render() {
    let { director, movies } = this.state;
    let directorDead;
    let moviesMatched = [];

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
              <img
                src={director.imagePath}
                className='film-image mt-5 mb-3'
                width={250}
              />
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
