import React from 'react';
import axiosInstance from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setGenres } from '../../actions/actions';
import GenresList from '../genres-list/genres-list';
import { Spinner } from 'react-bootstrap';

export class GenreMain extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    axiosInstance
      .get('/genres')
      .then((response) => {
        this.props.setGenres(response.data);
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
    const { genres } = this.props;
    let { loading } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Genres</h1>
        <GenresList genres={genres} />
        {loading && (
          <Spinner animation='border' variant='info' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}

GenreMain.propTypes = {
  genres: PropTypes.array.isRequired,
  setGenres: PropTypes.func.isRequired,
};

let mapStateToProps = (state) => {
  return { genres: state.genres };
};

export default connect(mapStateToProps, { setGenres })(GenreMain);
