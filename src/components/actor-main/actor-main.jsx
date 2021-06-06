import React from 'react';
import axiosInstance from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setActors } from '../../actions/actions';
import ActorsList from '../actors-list/actors-list';
import { Spinner } from 'react-bootstrap';

// Rendering actor components: * 1. actor-main -> 2. actors-list -> 3. actor-card -> 4. actor-view
export class ActorMain extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    axiosInstance
      .get('/actors')
      .then((response) => {
        this.props.setActors(response.data);
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
    const { actors } = this.props;
    let { loading } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Actors</h1>
        <ActorsList actors={actors} />
        {loading && (
          <Spinner animation='border' variant='info' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        )}
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
