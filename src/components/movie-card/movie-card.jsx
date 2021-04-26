import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <div
        className='movie-card'
        onClick={() => {
          onMovieClick(movieData);
        }}>
        {movieData.title}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.object.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
