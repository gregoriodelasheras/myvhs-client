import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import './genre-view.scss';

export default class GenreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: [],
    };
  }

  async componentDidMount() {
    const { genreID } = this.props.match.params;
    const token = localStorage.getItem('token');
    const genresURL = 'https://myvhs.herokuapp.com/genres/';

    const genresResponse = axios.get(genresURL + genreID, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const [genres] = await axios.all([genresResponse]);

    this.setState({
      genre: genres.data,
    });
  }

  render() {
    let { genre } = this.state;

    return (
      <Row className='main-view justify-content-md-center'>
        <Col className='genre-view text-center' md={8}>
          <div className='genre-name mb-2'>
            <span className='label font-weight-bold'>Name: </span>
            <span className='value'>{genre.name}</span>
          </div>
          <div className='genre-description mb-4'>
            <span className='label font-weight-bold'>Description: </span>
            <span className='value font-italic'>{genre.description}</span>
          </div>
        </Col>
      </Row>
    );
  }
}

GenreView.propTypes = {
  match: PropTypes.object,
};
