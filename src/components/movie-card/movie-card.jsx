import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card className='h-100' border='primary'>
        <Card.Img className='p-2' variant='top' src={movieData.imagePath} />
        <Card.Body>
          <Card.Title className='text-center'>{movieData.title}</Card.Title>
          <Card.Text className='text-center'>{movieData.releaseYear}</Card.Text>
          <Card.Text className='font-italic'>{movieData.description}</Card.Text>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Button onClick={() => onMovieClick(movieData)}>Read more</Button>
        </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
