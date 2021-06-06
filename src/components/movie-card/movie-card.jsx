import React from 'react';
import axiosInstance from '../../config';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

// Rendering movie components: 1. movie-main -> 2. movies-list -> * 3. movie-card -> 4. movie-view
export class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
    };
  }

  async componentDidMount() {
    const accessUsername = JSON.parse(localStorage.getItem('user'));

    const userResponse = await axiosInstance.get(`/users/${accessUsername}`);

    const [user] = await Promise.all([userResponse]);

    this.setState({
      user: user.data,
    });
  }

  render() {
    const { movie } = this.props;
    const { user } = this.state;
    const movieID = movie._id;
    const urlFavorite = `https://myvhs.herokuapp.com/users/${user.username}/favorites/${movieID}`;
    const urlToWatch = `https://myvhs.herokuapp.com/users/${user.username}/towatch/${movieID}`;

    // Add or remove movies from favorites list
    function ToggleFavoriteMovie() {
      if (user.favoriteMovies.includes(movieID)) {
        RemoveFavoriteMovie();
      } else {
        AddFavoriteMovie();
      }
    }

    // Add or remove movies from to-watch list
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

    // Add interaction buttons (show more, favorites and to-watch)
    const btnShow = (
      <Link to={`/movies/${movieID}`}>
        <Button className='btn-show m-2' variant='outline-info'>
          Show more
        </Button>
      </Link>
    );

    const btnFavorite = (
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip id='tooltip-favorite'>Favorite</Tooltip>}>
        <Button
          className='btn-favorite m-2'
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
          className='btn-watch m-2'
          variant='outline-primary'
          onClick={() => ToggleToWatchMovie()}>
          ◯
        </Button>
      </OverlayTrigger>
    );

    return (
      <Card className='card-image h-100'>
        <Card.Img variant='top' src={movie.imagePath} />
        <Card.Body>
          <Card.Title className='text-center'>{movie.title}</Card.Title>
          <Card.Text className='text-center'>{movie.releaseYear}</Card.Text>
          <Card.Text className='font-italic'>{movie.description}</Card.Text>
        </Card.Body>
        <Card.Footer className='text-center'>
          <div>{btnShow}</div>
          <div>
            {btnFavorite}
            {btnWatch}
          </div>
        </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
