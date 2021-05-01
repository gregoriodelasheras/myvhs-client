import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class DirectorCard extends React.Component {
  render() {
    const { director } = this.props;

    return (
      <Card className='h-100'>
        <Card.Img className='p-2' variant='top' src={director.imagePath} />
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
