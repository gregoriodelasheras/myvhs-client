import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

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

    const btnFavorite = (
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip id='tooltip-favorite'>To favorite list!</Tooltip>}>
        <Button
          className='btn-favorite my-2 mx-3'
          variant='outline-warning'
          /* onClick={} */
        >
          ★
        </Button>
      </OverlayTrigger>
    );

    const btnWatch = (
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip id='tooltip-watch'>To watch list!</Tooltip>}>
        <Button
          className='btn-watch my-2 mx-3'
          variant='outline-primary'
          /* onClick={} */
        >
          ◯
        </Button>
      </OverlayTrigger>
    );

    return (
      <div className='main-view text-center d-flex justify-content-center align-items-center'>
        <Row className='align-items-center'>
          <Col className='movie-view text-center' md={6}>
            <div className='movie-image'>
              <img
                src={movie.imagePath}
                className='film-image mt-5 mb-3'
                width={250}
              />
            </div>
            {btnFavorite}
            {btnWatch}
          </Col>
          <Col className='movie-view text-center' md={6}>
            <div className='movie-title my-4'>
              <h1 className='value'>{movie.title}</h1>
            </div>
            <div className='movie-description my-4'>
              <span className='value font-italic'>{movie.description}</span>
            </div>
            <div className='movie-year my-4'>
              <span className='label font-weight-bold'>Release Year: </span>
              <span className='value'>{movie.releaseYear}</span>
            </div>
            <div className='movie-time my-4'>
              <span className='label font-weight-bold'>Run Time: </span>
              <span className='value'>{movie.runTime}</span>
            </div>
            <div className='movie-genres my-4'>
              <p className='label font-weight-bold'>Genres: </p>
              {movie.genre &&
                movie.genre.map((genre, index) => (
                  <Link key={index} to={`/genres/${genre}`}>
                    <Button className='mx-1' variant='outline-info' size='sm'>
                      {this.getGenreName(genre)}
                    </Button>
                  </Link>
                ))}
            </div>
            <div className='movie-director my-4'>
              <p className='label font-weight-bold'>Director: </p>
              <Link to={`/directors/${movie.director}`}>
                <Button className='mx-1' variant='outline-info' size='sm'>
                  {this.getDirectorName(movie.director)}
                </Button>
              </Link>
            </div>
            <div className='movie-actors my-4'>
              <p className='label font-weight-bold'>Main Cast: </p>
              {movie.actors &&
                movie.actors.map((actor, index) => (
                  <Link key={index} to={`/actors/${actor}`}>
                    <Button className='mx-1' variant='outline-info' size='sm'>
                      {this.getActorName(actor)}
                    </Button>
                  </Link>
                ))}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  match: PropTypes.object,
};
