import React from 'react';
import axiosInstance from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setDirectors } from '../../actions/actions';
import DirectorsList from '../directors-list/directors-list';
import { Spinner } from 'react-bootstrap';

// Rendering director components: * 1. director-main -> 2. director-list -> 3. director-card -> 4. director-view
export class DirectorMain extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    axiosInstance
      .get('/directors')
      .then((response) => {
        this.props.setDirectors(response.data);
        this.setState({
          loading: false,
        });
      })
      .catch(function (error) {
        console.error(error);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { directors } = this.props;
    let { loading } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Directors</h1>
        <DirectorsList directors={directors} />
        {loading && (
          <Spinner animation='border' variant='info' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        )}
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
