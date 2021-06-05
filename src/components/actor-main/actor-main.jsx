import React from 'react';
import axiosInstance from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setActors } from '../../actions/actions';
import ActorsList from '../actors-list/actors-list';

export class ActorMain extends React.Component {
  componentDidMount() {
    axiosInstance
      .get('/actors')
      .then((response) => {
        this.props.setActors(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { actors } = this.props;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Actors</h1>
        <ActorsList actors={actors} />
      </div>
    );
  }
}

ActorMain.propTypes = {
  actors: PropTypes.array.isRequired,
  setActors: PropTypes.func.isRequired,
};

let mapStateToProps = (state) => {
  return { actors: state.actors };
};

export default connect(mapStateToProps, { setActors })(ActorMain);
