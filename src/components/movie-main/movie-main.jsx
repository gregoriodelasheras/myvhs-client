import React from 'react';
import axios from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

export class MovieMain extends React.Component {
  componentDidMount() {
    axios
      .get('/movies')
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { movies } = this.props;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Movies</h1>
        <MoviesList movies={movies} />
      </div>
    );
  }
}

MovieMain.propTypes = {
  movies: PropTypes.array.isRequired,
  setMovies: PropTypes.func.isRequired,
};

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MovieMain);
