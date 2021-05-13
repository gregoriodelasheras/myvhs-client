import React from 'react';
import axios from '../../config';
import { ActorCard } from '../actor-card/actor-card';
import { Row, Col } from 'react-bootstrap';

export default class ActorMain extends React.Component {
  constructor() {
    super();
    this.state = {
      actors: [],
    };
  }

  componentDidMount() {
    axios
      .get('/actors')
      .then((response) => {
        this.setState({
          actors: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { actors } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1 className='my-4'>Actors</h1>
        <Row>
          {actors.map((actor) => (
            <Col sm={6} lg={3} className={'my-3'} key={actor._id}>
              <ActorCard actor={actor} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
