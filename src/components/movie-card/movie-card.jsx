/* eslint-disable react/prop-types */
import React from 'react';

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
