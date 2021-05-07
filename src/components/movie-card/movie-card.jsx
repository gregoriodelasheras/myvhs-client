import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
    };
  }

  async componentDidMount() {
    const accessUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('token');

    const profileURL = `https://myvhs.herokuapp.com/users/${accessUser}`;

    const profileResponse = axios.get(profileURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const [user] = await axios.all([profileResponse]);

    this.setState({
      user: user.data,
    });
  }

  render() {
    const { movie } = this.props;
    const { user } = this.state;
    const accessToken = localStorage.getItem('token');
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
      axios
        .post(urlFavorite, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
          'Content-Type': 'application/json',
        })
        .then(() => {
          /*  */
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function RemoveFavoriteMovie() {
      axios
        .delete(urlFavorite, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          /*  */
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function AddToWatchMovie() {
      const data = JSON.stringify({
        toWatchMovies: movieID,
      });
      axios
        .post(urlToWatch, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
          'Content-Type': 'application/json',
        })
        .then(() => {
          /*  */
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function RemoveToWatchMovie() {
      axios
        .delete(urlToWatch, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          /*  */
        })
        .catch(function (error) {
          console.log(error);
        });
    }

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
        overlay={<Tooltip id='tooltip-favorite'>To favorite list!</Tooltip>}>
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
        overlay={<Tooltip id='tooltip-watch'>To watch list!</Tooltip>}>
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
