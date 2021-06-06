import React from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../config';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col, Spinner } from 'react-bootstrap';

export default class ActorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actor: [],
      movies: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { actorID } = this.props.match.params;

    const actorResponse = await axiosInstance.get(`/actors/${actorID}`);

    const moviesResponse = await axiosInstance.get('/movies');

    const [actor, movies] = await Promise.all([actorResponse, moviesResponse]);

    this.setState({
      actor: actor.data,
      movies: movies.data,
      loading: false,
    });
  }

  render() {
    let { actor, movies, loading } = this.state;
    let actorDead;
    let moviesMatched = [];

    function ActorIsDead() {
      if (actor.deathYear) {
        actorDead = (
          <div className='actor-death'>
            <span className='label font-weight-bold'>Year of death: </span>
            <span className='value'>{actor.deathYear}</span>
          </div>
        );
      }
    }

    function ShowMovies() {
      movies.map((movie) => {
        if (movie.actors.includes(actor._id)) {
          moviesMatched.push(
            <Col sm={6} lg={3} className={'mb-4'} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>,
          );
        }
      });
    }

    ActorIsDead();
    ShowMovies();

    return (
      <div className='main-view'>
        <Row className='justify-content-md-center'>
          <Col className='actor-view text-center' md={8}>
            <div className='actor-image'>
              <img
                src={actor.imagePath}
                className='film-image mt-5 mb-3'
                width={250}
              />
            </div>
            <div className='actor-name my-4'>
              <h1 className='value'>{actor.name}</h1>
            </div>
            <div className='actor-birth'>
              <span className='label font-weight-bold'>Year of birth: </span>
              <span className='value'>{actor.birthYear}</span>
            </div>
            {actorDead}
            <div className='actor-description my-4'>
              <span className='value font-italic'>{actor.bio}</span>
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

ActorView.propTypes = {
  match: PropTypes.object,
};
