import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class ActorCard extends React.Component {
  render() {
    const { actor } = this.props;

    return (
      <Card className='card-image h-100'>
        <Card.Img variant='top' src={actor.imagePath} />
        <Card.Body>
          <Card.Title className='text-center'>{actor.name}</Card.Title>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Link to={`/actors/${actor._id}`}>
            <Button variant='outline-info'>Show more</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

ActorCard.propTypes = {
  actor: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
