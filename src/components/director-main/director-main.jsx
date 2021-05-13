import React from 'react';
import axios from '../../config';
import { DirectorCard } from '../director-card/director-card';
import { Row, Col } from 'react-bootstrap';

export default class DirectorMain extends React.Component {
  constructor() {
    super();
    this.state = {
      directors: [],
    };
  }

  componentDidMount() {
    axios
      .get('/directors')
      .then((response) => {
        this.setState({
          directors: response.data,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    const { directors } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Directors</h1>
        <Row>
          {directors.map((director) => (
            <Col sm={6} lg={3} className={'my-3'} key={director._id}>
              <DirectorCard director={director} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
