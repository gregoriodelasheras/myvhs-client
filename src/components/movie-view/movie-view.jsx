import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-image'>
          <img src={movieData.imagePath} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movieData.title}</span>
        </div>
        <div className='movie-year'>
          <span className='label'>Release Year: </span>
          <span className='value'>{movieData.releaseYear}</span>
        </div>
        <div className='movie-genres'>
          <span className='label'>Genres: </span>
          <span className='value'>{movieData.genre.join(' / ')}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director: </span>
          <span className='value'>{movieData.director}</span>
        </div>
        <div className='movie-actors'>
          <span className='label'>Main Cast: </span>
          <span className='value'>{movieData.actors.join(', ')}</span>
        </div>
        <div className='movie-time'>
          <span className='label'>Run Time: </span>
          <span className='value'>{movieData.runTime}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movieData.description}</span>
        </div>
        <button
          onClick={() => {
            onBackClick(null);
          }}>
          Back
        </button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
