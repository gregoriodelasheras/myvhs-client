import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import ErrorList from '../messages/error-list';
import { GenreCard } from '../genre-card/genre-card';
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// Rendering genre components: 1. genre-main -> * 2. genres-list -> 3. genre-card -> 4. genre-view
function GenresList(props) {
  const { genres, visibilityFilter } = props;
  let filteredGenres = genres;

  // Filter genres
  if (visibilityFilter !== '') {
    filteredGenres = genres.filter((genre) =>
      genre.name.toLowerCase().includes(visibilityFilter.toLowerCase()),
    );
  }

  // Error catcher
  if (!genres) return <ErrorList />;

  return (
    <>
      <Row>
        <Col className='my-3'>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <Row>
        {filteredGenres.map((genre) => (
          <Col sm={6} lg={3} className={'my-3'} key={genre._id}>
            <GenreCard genre={genre} />
          </Col>
        ))}
      </Row>
    </>
  );
}

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(GenresList);
