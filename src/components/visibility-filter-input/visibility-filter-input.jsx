import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../actions/actions';
import { Form } from 'react-bootstrap';

// Filter items from the lists of actors, directors, genres and movies
function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder='Search for a movie here!'
    />
  );
}

VisibilityFilterInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default connect(null, { setFilter })(VisibilityFilterInput);
