import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(visibilityFilter.toLowerCase()),
    );
  }

  if (!movies)
    return (
      <div className='main-view'>
        <p>
          If you type something, it gives an error, because movies has no data.
        </p>
        <Col md={12} style={{ margin: '1em' }}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        <h3>ERROR! No movies!</h3>
        <p>
          Failed prop type: The prop `movies` is marked as required in
          `MoviesList`, but its value is `undefined`
        </p>
      </div>
    );

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
