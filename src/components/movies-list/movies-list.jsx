import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import ErrorList from '../messages/error-list';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// Rendering movie components: 1. movie-main -> * 2. movies-list -> 3. movie-card -> 4. movie-view
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  // Filter movies
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(visibilityFilter.toLowerCase()),
    );
  }

  // Error catcher
  if (!movies) return <ErrorList />;

  return (
    <>
      <Row>
        <Col className='my-3'>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <Row>
        {filteredMovies.map((movie) => (
          <Col sm={6} lg={3} className={'my-3'} key={movie._id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MoviesList);
