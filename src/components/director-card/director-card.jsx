import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

// Rendering director components: 1. director-main -> 2. directors-list -> * 3. director-card -> 4. director-view
export class DirectorCard extends React.Component {
  render() {
    const { director } = this.props;

    return (
      <Card className='card-image h-100'>
        <Card.Img variant='top' src={director.imagePath} />
        <Card.Body>
          <Card.Title className='text-center'>{director.name}</Card.Title>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Link to={`/directors/${director._id}`}>
            <Button variant='outline-info'>Show more</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

DirectorCard.propTypes = {
  director: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
