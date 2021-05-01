import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className='h-100'>
        <Card.Img className='p-2' variant='top' src={movie.imagePath} />
        <Card.Body>
          <Card.Title className='text-center'>{movie.title}</Card.Title>
          <Card.Text className='text-center'>{movie.releaseYear}</Card.Text>
          <Card.Text className='font-italic'>{movie.description}</Card.Text>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='outline-info'>Show more</Button>
          </Link>
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
