import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

export default class ActorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actor: [],
      movies: [],
    };
  }

  async componentDidMount() {
    const { actorID } = this.props.match.params;
    const token = localStorage.getItem('token');

    const actorsURL = 'https://myvhs.herokuapp.com/actors/';
    const moviesURL = 'https://myvhs.herokuapp.com/movies';

    const actorResponse = axios.get(actorsURL + actorID, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const moviesResponse = axios.get(moviesURL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const [actor, movies] = await axios.all([actorResponse, moviesResponse]);

    this.setState({
      actor: actor.data,
      movies: movies.data,
    });
  }

  getMovieName(id) {
    const movie = this.state.movies.find((movie) => movie._id === id);
    return movie.title;
  }

  render() {
    let { actor } = this.state;
    let actorDead;

    if (actor.deathYear) {
      actorDead = (
        <div className='actor-death mb-2'>
          <span className='label font-weight-bold'>Year of death: </span>
          <span className='value'>{actor.deathYear}</span>
        </div>
      );
    }

    return (
      actor && (
        <Row className='main-view justify-content-md-center pt-4'>
          <Col className='actor-view text-center' md={8}>
            <div className='actor-image mb-4'>
              <img src={actor.imagePath} width={250} />
            </div>
            <div className='actor-name mb-2'>
              <span className='label font-weight-bold'>Name: </span>
              <span className='value'>{actor.name}</span>
            </div>
            <div className='actor-birth mb-2'>
              <span className='label font-weight-bold'>Year of birth: </span>
              <span className='value'>{actor.birthYear}</span>
            </div>
            {actorDead}
            <div className='actor-description mb-2'>
              <span className='label font-weight-bold'>Biography: </span>
              <span className='value font-italic'>{actor.bio}</span>
            </div>
            <div className='actor-movies mb-2'>
              <p className='label font-weight-bold mb-2'>Movies: </p>
              {actor.movies &&
                actor.movies.map((movie, index) => (
                  <Link key={index} to={`/movies/${movie}`}>
                    <Button className='mx-1' variant='outline-info' size='sm'>
                      {this.getMovieName(movie)}
                    </Button>
                  </Link>
                ))}
            </div>
          </Col>
        </Row>
      )
    );
  }
}

ActorView.propTypes = {
  match: PropTypes.object,
};
