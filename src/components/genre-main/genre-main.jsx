import React from 'react';
import axios from 'axios';
import { GenreCard } from '../genre-card/genre-card';
import { Row, Col } from 'react-bootstrap';

export default class GenreMain extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: [],
    };
  }

  getGenres(token) {
    axios
      .get('https://myvhs.herokuapp.com/genres', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          genres: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getGenres(accessToken);
    }
  }

  render() {
    const { genres } = this.state;

    return (
      <Row className='main-view justify-content-md-center pt-4'>
        {genres.map((genre) => (
          <Col sm={6} lg={3} className={'mb-4'} key={genre._id}>
            <GenreCard genre={genre} />
          </Col>
        ))}
      </Row>
    );
  }
}
