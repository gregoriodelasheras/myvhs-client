import React from 'react';
import axiosInstance from '../../config';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col, Alert } from 'react-bootstrap';

// Component that allows the user to view or remove movies from their favorite list
export default class FavoriteView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      movies: [],
    };
  }

  async componentDidMount() {
    let accessUsername = JSON.parse(localStorage.getItem('user'));

    const userResponse = await axiosInstance.get(`/users/${accessUsername}`);
    const moviesResponse = await axiosInstance.get('/movies');

    const [user, movies] = await Promise.all([userResponse, moviesResponse]);

    this.setState({
      user: user.data,
      movies: movies.data,
    });
  }

  render() {
    const { user, movies } = this.state;
    let moviesMatched = [];
    let favoriteView = (
      <Row className='justify-content-md-center'>{moviesMatched}</Row>
    );

    // Show movies that the user has added to his or her favorite list
    function ShowMovies() {
      movies.map((movie) => {
        if (user.favoriteMovies.includes(movie._id)) {
          moviesMatched.push(
            <Col sm={6} lg={3} className={'mb-4'} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>,
          );
        }
      });

      // Show special message to the user if the list is empty
      if (moviesMatched.length === 0) {
        favoriteView = (
          <Row className='justify-content-md-center text-center'>
            <Col>
              <Alert className='alert-info alert-message my-5' variant='alert'>
                <p className='h5'>
                  Hey, it&apos;s looking a little empty around here!
                </p>
                <p className='h5'>
                  Why don&apos;t you add your{' '}
                  <a href='/movies'>favorite movie</a> from 1987?
                </p>
              </Alert>
            </Col>
          </Row>
        );
      }
    }

    ShowMovies();

    return (
      <div className='main-view'>
        <Row className='justify-content-md-center'>
          <Col className='genre-view text-center' md={8}>
            <h1 className='my-4'>My favorite movies</h1>
          </Col>
        </Row>
        {favoriteView}
      </div>
    );
  }
}
