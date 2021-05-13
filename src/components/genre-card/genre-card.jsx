import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class GenreCard extends React.Component {
  render() {
    const { genre } = this.props;

    return (
      <Card className='card-image h-100'>
        <Card.Img variant='top' src={genre.imagePath} className='p-3' />
        <Card.Body>
          <Card.Title className='text-center'>{genre.name}</Card.Title>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Link to={`/genres/${genre._id}`}>
            <Button variant='outline-info'>Show more</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

GenreCard.propTypes = {
  genre: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
