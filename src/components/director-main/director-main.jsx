import React from 'react';
import axios from 'axios';
import { DirectorCard } from '../director-card/director-card';
import { Row, Col } from 'react-bootstrap';

export default class DirectorMain extends React.Component {
  constructor() {
    super();
    this.state = {
      directors: [],
    };
  }

  getDirectors(token) {
    axios
      .get('https://myvhs.herokuapp.com/directors', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          directors: response.data,
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
      this.getDirectors(accessToken);
    }
  }

  render() {
    const { directors } = this.state;

    return (
      <Row className='main-view justify-content-md-center pt-4'>
        {directors.map((director) => (
          <Col sm={6} lg={3} className={'mb-4'} key={director._id}>
            <DirectorCard director={director} />
          </Col>
        ))}
      </Row>
    );
  }
}
