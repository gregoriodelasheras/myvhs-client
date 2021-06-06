import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import ErrorList from '../messages/error-list';
import { ActorCard } from '../actor-card/actor-card';
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function ActorsList(props) {
  const { actors, visibilityFilter } = props;
  let filteredActors = actors;

  if (visibilityFilter !== '') {
    filteredActors = actors.filter((actor) =>
      actor.name.toLowerCase().includes(visibilityFilter.toLowerCase()),
    );
  }

  if (!actors) return <ErrorList />;

  return (
    <>
      <Row>
        <Col className='my-3'>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <Row>
        {filteredActors.map((actor) => (
          <Col sm={6} lg={3} className={'my-3'} key={actor._id}>
            <ActorCard actor={actor} />
          </Col>
        ))}
      </Row>
    </>
  );
}

ActorsList.propTypes = {
  actors: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ActorsList);
