import React from 'react';
import axios from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setDirectors } from '../../actions/actions';
import DirectorsList from '../directors-list/directors-list';

export class DirectorMain extends React.Component {
  componentDidMount() {
    axios
      .get('/directors')
      .then((response) => {
        this.props.setDirectors(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    const { directors } = this.props;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Directors</h1>
        <DirectorsList directors={directors} />
      </div>
    );
  }
}

DirectorMain.propTypes = {
  directors: PropTypes.array.isRequired,
  setDirectors: PropTypes.func.isRequired,
};

let mapStateToProps = (state) => {
  return { directors: state.directors };
};

export default connect(mapStateToProps, { setDirectors })(DirectorMain);
