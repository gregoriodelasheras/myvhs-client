import React from 'react';
import axios from 'axios';
import { ActorCard } from '../actor-card/actor-card';
import { Row, Col } from 'react-bootstrap';

export default class ActorMain extends React.Component {
  constructor() {
    super();
    this.state = {
      actors: [],
    };
  }

  getActors(token) {
    axios
      .get('https://myvhs.herokuapp.com/actors', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          actors: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getActors(accessToken);
    }
  }

  render() {
    const { actors } = this.state;

    return (
      <div className='main-view text-center my-3'>
        <h1>Actors</h1>
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
