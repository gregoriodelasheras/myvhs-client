import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <div className='movie-view text-center'>
        <div className='movie-image mb-4'>
          <img src={movieData.imagePath} />
        </div>
        <div className='movie-title mb-2'>
          <span className='label font-weight-bold'>Title: </span>
          <span className='value'>{movieData.title}</span>
        </div>
        <div className='movie-year mb-2'>
          <span className='label font-weight-bold'>Release Year: </span>
          <span className='value'>{movieData.releaseYear}</span>
        </div>
        <div className='movie-genres mb-2'>
          <span className='label font-weight-bold'>Genres: </span>
          <span className='value'>{movieData.genre.join(' / ')}</span>
        </div>
        <div className='movie-director mb-2'>
          <span className='label font-weight-bold'>Director: </span>
          <span className='value'>{movieData.director}</span>
        </div>
        <div className='movie-actors mb-2'>
          <span className='label font-weight-bold'>Main Cast: </span>
          <span className='value'>{movieData.actors.join(', ')}</span>
        </div>
        <div className='movie-time mb-2'>
          <span className='label font-weight-bold'>Run Time: </span>
          <span className='value'>{movieData.runTime}</span>
        </div>
        <div className='movie-description mb-4'>
          <span className='label font-weight-bold'>Description: </span>
          <span className='value font-italic'>{movieData.description}</span>
        </div>
        <Button
          className='px-5'
          onClick={() => {
            onBackClick(null);
          }}>
          Back
        </Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    genre: PropTypes.array.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    runTime: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
