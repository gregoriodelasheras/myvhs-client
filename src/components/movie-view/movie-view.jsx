import React from 'react';
import axiosInstance from '../../config';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from 'react-bootstrap';

export default class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: [],
      genres: [],
      directors: [],
      actors: [],
      user: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { movieID } = this.props.match.params;
    const accessUsername = JSON.parse(localStorage.getItem('user'));

    const movieResponse = await axiosInstance.get(`/movies/${movieID}`);
    const genresResponse = await axiosInstance.get('/genres');
    const directorsResponse = await axiosInstance.get('/directors');
    const actorsResponse = await axiosInstance.get('/actors');
    const userResponse = await axiosInstance.get(`/users/${accessUsername}`);

    const [movie, genres, directors, actors, user] = await Promise.all([
      movieResponse,
      genresResponse,
      directorsResponse,
      actorsResponse,
      userResponse,
    ]);

    this.setState({
      movie: movie.data,
      genres: genres.data,
      directors: directors.data,
      actors: actors.data,
      user: user.data,
      loading: false,
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
    let { movie, user, loading } = this.state;
    const movieID = movie._id;
    const urlFavorite = `https://myvhs.herokuapp.com/users/${user.username}/favorites/${movieID}`;
    const urlToWatch = `https://myvhs.herokuapp.com/users/${user.username}/towatch/${movieID}`;

    function ToggleFavoriteMovie() {
      if (user.favoriteMovies.includes(movieID)) {
        RemoveFavoriteMovie();
      } else {
        AddFavoriteMovie();
      }
    }

    function ToggleToWatchMovie() {
      if (user.toWatchMovies.includes(movieID)) {
        RemoveToWatchMovie();
      } else {
        AddToWatchMovie();
      }
    }

    function AddFavoriteMovie() {
      const data = JSON.stringify({
        favoriteMovies: movieID,
      });
      axiosInstance
        .post(urlFavorite, data, {
          'Content-Type': 'application/json',
        })
        .then(() => {
          window.open(`/users/${user.username}/favorite`, '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function RemoveFavoriteMovie() {
      axiosInstance
        .delete(urlFavorite)
        .then(() => {
          window.open(`/users/${user.username}/favorite`, '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function AddToWatchMovie() {
      const data = JSON.stringify({
        toWatchMovies: movieID,
      });
      axiosInstance
        .post(urlToWatch, data, {
          'Content-Type': 'application/json',
        })
        .then(() => {
          window.open(`/users/${user.username}/towatch`, '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function RemoveToWatchMovie() {
      axiosInstance
        .delete(urlToWatch)
        .then(() => {
          window.open(`/users/${user.username}/towatch`, '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const btnFavorite = (
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip id='tooltip-favorite'>Favorite</Tooltip>}>
        <Button
          className='btn-favorite my-2 mx-3'
          variant='outline-warning'
          onClick={() => ToggleFavoriteMovie()}>
          ★
        </Button>
      </OverlayTrigger>
    );

    const btnWatch = (
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip id='tooltip-watch'>To Watch</Tooltip>}>
        <Button
          className='btn-watch my-2 mx-3'
          variant='outline-primary'
          onClick={() => ToggleToWatchMovie()}>
          ◯
        </Button>
      </OverlayTrigger>
    );

    return (
      <div className='main-view text-center d-flex justify-content-center align-items-center'>
        <Row className='align-items-center'>
          <Col className='movie-view text-center' md={6}>
            <div className='movie-image'>
              <img src={movie.imagePath} className='film-image mt-5 mb-3' />
            </div>
            {btnFavorite}
            {btnWatch}
          </Col>
          <Col className='movie-view text-center' md={6}>
            {loading && (
              <Spinner animation='border' variant='info' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            )}
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
