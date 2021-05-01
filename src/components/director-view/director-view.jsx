import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

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
    const token = localStorage.getItem('token');

    const directorsURL = 'https://myvhs.herokuapp.com/directors/';
    const moviesURL = 'https://myvhs.herokuapp.com/movies';

    const directorResponse = axios.get(directorsURL + directorID, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const moviesResponse = axios.get(moviesURL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const [director, movies] = await axios.all([
      directorResponse,
      moviesResponse,
    ]);

    this.setState({
      director: director.data,
      movies: movies.data,
    });
  }

  getMovieName(id) {
    const movie = this.state.movies.find((movie) => movie._id === id);
    return movie.title;
  }

  render() {
    let { director } = this.state;
    let directorDead;

    if (director.deathYear) {
      directorDead = (
        <div className='director-death mb-2'>
          <span className='label font-weight-bold'>Year of death: </span>
          <span className='value'>{director.deathYear}</span>
        </div>
      );
    }

    return (
      director && (
        <Row className='main-view justify-content-md-center pt-4'>
          <Col className='director-view text-center' md={8}>
            <div className='director-image mb-4'>
              <img src={director.imagePath} width={250} />
            </div>
            <div className='director-name mb-2'>
              <span className='label font-weight-bold'>Name: </span>
              <span className='value'>{director.name}</span>
            </div>
            <div className='director-birth mb-2'>
              <span className='label font-weight-bold'>Year of birth: </span>
              <span className='value'>{director.birthYear}</span>
            </div>
            {directorDead}
            <div className='director-description mb-2'>
              <span className='label font-weight-bold'>Biography: </span>
              <span className='value font-italic'>{director.bio}</span>
            </div>
            <div className='director-movies mb-2'>
              <p className='label font-weight-bold mb-2'>Movies: </p>
              {director.movies &&
                director.movies.map((movie, index) => (
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

DirectorView.propTypes = {
  match: PropTypes.object,
};
