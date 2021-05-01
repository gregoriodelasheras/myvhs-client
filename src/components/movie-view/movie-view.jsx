import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

export default class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: [],
      genres: [],
      directors: [],
      actors: [],
    };
  }

  async componentDidMount() {
    const { movieID } = this.props.match.params;
    const token = localStorage.getItem('token');

    const movieURL = 'https://myvhs.herokuapp.com/movies/';
    const genresURL = 'https://myvhs.herokuapp.com/genres';
    const directorsURL = 'https://myvhs.herokuapp.com/directors';
    const actorsURL = 'https://myvhs.herokuapp.com/actors';

    const movieResponse = axios.get(movieURL + movieID, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const genresResponse = axios.get(genresURL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const directorsResponse = axios.get(directorsURL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const actorsResponse = axios.get(actorsURL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const [movie, genres, directors, actors] = await axios.all([
      movieResponse,
      genresResponse,
      directorsResponse,
      actorsResponse,
    ]);

    this.setState({
      movie: movie.data,
      genres: genres.data,
      directors: directors.data,
      actors: actors.data,
    });
  }

  getGenreName(id) {
    const genre = this.state.genres.find((genre) => genre._id === id);
    return genre.name;
  }

  getDirectorName(id) {
    const director = this.state.directors.find(
      (director) => director._id === id,
    );
    return director?.name;
  }

  getActorName(id) {
    const actor = this.state.actors.find((actor) => actor._id === id);
    return actor.name;
  }

  render() {
    let { movie } = this.state;

    return (
      movie && (
        <Row className='main-view justify-content-md-center pt-4'>
          <Col className='movie-view text-center' md={8}>
            <div className='movie-image mb-4'>
              <img src={movie.imagePath} width={250} />
            </div>
            <div className='movie-title mb-2'>
              <span className='label font-weight-bold'>Title: </span>
              <span className='value'>{movie.title}</span>
            </div>
            <div className='movie-year mb-2'>
              <span className='label font-weight-bold'>Release Year: </span>
              <span className='value'>{movie.releaseYear}</span>
            </div>
            <div className='movie-time mb-2'>
              <span className='label font-weight-bold'>Run Time: </span>
              <span className='value'>{movie.runTime}</span>
            </div>
            <div className='movie-genres mb-2'>
              <p className='label font-weight-bold mb-1'>Genres: </p>
              {movie.genre &&
                movie.genre.map((genre, index) => (
                  <Link key={index} to={`/genres/${genre}`}>
                    <Button className='mx-1' variant='outline-info' size='sm'>
                      {this.getGenreName(genre)}
                    </Button>
                  </Link>
                ))}
            </div>
            <div className='movie-director mb-2'>
              <p className='label font-weight-bold mb-1'>Director: </p>
              <Link to={`/directors/${movie.director}`}>
                <Button className='mx-1' variant='outline-info' size='sm'>
                  {this.getDirectorName(movie.director)}
                </Button>
              </Link>
            </div>
            <div className='movie-actors mb-2'>
              <p className='label font-weight-bold mb-1'>Main Cast: </p>
              {movie.actors &&
                movie.actors.map((actor, index) => (
                  <Link key={index} to={`/actors/${actor}`}>
                    <Button className='mx-1' variant='outline-info' size='sm'>
                      {this.getActorName(actor)}
                    </Button>
                  </Link>
                ))}
            </div>
            <div className='movie-description mb-4'>
              <span className='label font-weight-bold'>Description: </span>
              <span className='value font-italic'>{movie.description}</span>
            </div>
          </Col>
        </Row>
      )
    );
  }
}

MovieView.propTypes = {
  match: PropTypes.object,
};
