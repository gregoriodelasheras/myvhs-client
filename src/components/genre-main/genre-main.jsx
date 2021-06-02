import React from 'react';
import axios from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setGenres } from '../../actions/actions';
import GenresList from '../genres-list/genres-list';

export class GenreMain extends React.Component {
  componentDidMount() {
    axios
      .get('/genres')
      .then((response) => {
        this.props.setGenres(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { genres } = this.props;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Genres</h1>
        <GenresList genres={genres} />
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
