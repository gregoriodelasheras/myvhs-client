import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    const btnShow = (
      <Link to={`/movies/${movie._id}`}>
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
          className='btn-watch m-2'
          variant='outline-primary'
          /* onClick={} */
        >
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
