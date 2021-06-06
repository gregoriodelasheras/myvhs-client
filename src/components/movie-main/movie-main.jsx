import React from 'react';
import axiosInstance from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { Spinner } from 'react-bootstrap';

// Rendering movie components: * 1. movie-main -> 2. movies-list -> 3. movie-card -> 4. movie-view
export class MovieMain extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    axiosInstance
      .get('/movies')
      .then((response) => {
        this.props.setMovies(response.data);
        this.setState({
          loading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    let { movies } = this.props;
    let { loading } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Movies</h1>
        <MoviesList movies={movies} />
        {loading && (
          <Spinner animation='border' variant='info' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        )}
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
