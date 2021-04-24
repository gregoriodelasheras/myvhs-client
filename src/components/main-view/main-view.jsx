import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          title: 'Star Wars: Episode V - The Empire Strikes Back',
          genre: ['Action', 'Adventure', 'Fantasy'],
          director: ' Irvin Kershner',
          actors: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
          releaseYear: 1980,
          runTime: '2h 4min',
          imagePath:
            'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
          description:
            'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.',
        },
        {
          _id: 2,
          title: 'The Shining',
          genre: ['Drama', 'Horror'],
          director: 'Stanley Kubrick',
          actors: ['Jack Nicholson', 'Shelley Duvall', 'Danny Lloyd'],
          releaseYear: 1980,
          runTime: '2h 26min',
          imagePath:
            'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
          description:
            'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
        },
        {
          _id: 3,
          title: 'Back to the Future',
          genre: ['Adventure', 'Comedy', 'Sci-Fi'],
          director: 'Robert Zemeckis',
          actors: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson'],
          releaseYear: 1985,
          runTime: '1h 56min',
          imagePath:
            'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
          description:
            'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
        },
        {
          _id: 4,
          title: 'Blade Runner',
          genre: ['Action', 'Sci-Fi', 'Thriller'],
          director: 'Ridley Scott',
          actors: ['Harrison Ford', 'Rutger Hauer', 'Sean Young'],
          releaseYear: 1982,
          runTime: '1h 57min',
          imagePath:
            'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg',
          description:
            'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
        },
        {
          _id: 5,
          title: 'Raiders of the Lost Ark',
          genre: ['Action', 'Adventure'],
          director: 'Steven Spielberg',
          actors: ['Harrison Ford', 'Karen Allen', 'Paul Freeman'],
          releaseYear: 1981,
          runTime: '1h 55min',
          imagePath:
            'https://m.media-amazon.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_UX182_CR0,0,182,268_AL_.jpg',
          description:
            "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className='main-view'>The list is empty.</div>;

    return (
      <div className='main-view'>
        {selectedMovie ? (
          <MovieView
            movieData={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieData={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
