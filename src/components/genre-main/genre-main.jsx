import React from 'react';
import axios from '../../config';
import { GenreCard } from '../genre-card/genre-card';
import { Row, Col } from 'react-bootstrap';

export default class GenreMain extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: [],
    };
  }

  componentDidMount() {
    axios
      .get('/genres')
      .then((response) => {
        this.setState({
          genres: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { genres } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1>Genres</h1>
        <Row>
          {genres.map((genre) => (
            <Col sm={6} lg={3} className={'my-3'} key={genre._id}>
              <GenreCard genre={genre} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
