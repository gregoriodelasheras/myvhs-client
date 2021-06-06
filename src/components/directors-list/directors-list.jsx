import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import ErrorList from '../messages/error-list';
import { DirectorCard } from '../director-card/director-card';
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// Rendering director components: 1. director-main -> * 2. directors-list -> 3. director-card -> 4. director-view
function DirectorsList(props) {
  const { directors, visibilityFilter } = props;
  let filteredDirectors = directors;

  // Filter directors
  if (visibilityFilter !== '') {
    filteredDirectors = directors.filter((director) =>
      director.name.toLowerCase().includes(visibilityFilter.toLowerCase()),
    );
  }

  // Error catcher
  if (!directors) return <ErrorList />;

  return (
    <>
      <Row>
        <Col className='my-3'>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <Row>
        {filteredDirectors.map((director) => (
          <Col sm={6} lg={3} className={'my-3'} key={director._id}>
            <DirectorCard director={director} />
          </Col>
        ))}
      </Row>
    </>
  );
}

DirectorsList.propTypes = {
  directors: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DirectorsList);
