import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

export default class ToWatchView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      movies: [],
    };
  }

  async componentDidMount() {
    const accessUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('token');

    const profileURL = `https://myvhs.herokuapp.com/users/${accessUser}`;
    const moviesURL = 'https://myvhs.herokuapp.com/movies';

    const profileResponse = axios.get(profileURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const moviesResponse = axios.get(moviesURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const [user, movies] = await axios.all([profileResponse, moviesResponse]);

    this.setState({
      user: user.data,
      movies: movies.data,
    });
  }

  render() {
    const { user, movies } = this.state;
    let moviesMatched = [];

    function ShowMovies() {
      movies.map((movie) => {
        if (user.toWatchMovies.includes(movie._id)) {
          moviesMatched.push(
            <Col sm={6} lg={3} className={'mb-4'} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>,
          );
        }
      });
    }

    ShowMovies();

    return (
      <div className='main-view'>
        <Row className='justify-content-md-center'>
          <Col className='genre-view text-center' md={8}>
            <h1 className='my-4'>Movies to watch</h1>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>{moviesMatched}</Row>
      </div>
    );
  }
}
