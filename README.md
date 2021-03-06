<!-- PROJECT LOGO -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/8443ece5-3b1d-43f7-b387-a22ed92083c6/deploy-status)](https://app.netlify.com/sites/myvhs/deploys)

<p align="center">
  <a href="https://myvhs.netlify.app/">
    <img src="src/assets/logo-readme.svg" alt="Logo" width="600">
  </a>
  <p align="center">
    Web App for enthusiasts of 80's movies. All in one VHS! Built with the MERN stack, its own API and deployed with Netlify.
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#dependencies">Dependencies</a></li>
    <li><a href="#dev-dependencies">Dev Dependencies</a></li>
    <li><a href="#why-react">Why React?</a></li>
    <li><a href="#server-side">Server-side</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
  <img src="https://user-images.githubusercontent.com/77192223/120920765-bead9700-c6c0-11eb-881f-1f834378ee86.png" alt="App Screenshot">
</p>

### Objective:

- Build a web application that provides users with access to information about different movies, genres, directors and actors of the 1980s. Users are able to register, update their personal information, deregister and create a list of "Favorites" and "To Watch" movies.

### User Stories:

- As a user, I want to be able to receive information on movies, genres, directors and actors of the 1980s so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to have a "Favorites" list and a "To Watch" list, and add and remove movies from them.
- As a user, I want to access a simple web application with a minimalist interface, displaying only essential information.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.
- As a user, I want to be able to update my personal data.
- As a user, I want to be able to deregister my profile from the web application database.

### Key Features:

- Return a list of movies of the 80's to the user.
- Return data about a single movie by title to the user.
- Return data about movie genres to the user.
- Return data about directors and actors to the user.
- Allow new users to register.
- Allow users to update their data by username.
- Allow existing users to deregister by username.
- Allow users to add and remove movies to their "Favorites" list by movie ID.
- Allow users to add and remove movies to their "To Watch" list by movie ID.
- Secure access to the API data: authentication and authorization with HTTP and JSON Web Token.

### Kanban Board:

The development of this application was organized through a Kanban board. You can see the board by [following this link](https://trello.com/b/44Fttxq0/myvhs-client-side).

## Built With

- [JavaScript](https://www.javascript.com/)
- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Netlify](https://www.netlify.com/)

## Dependencies

- axios
- parcel v2
- prop-types
- react
- react-bootstrap
- react-dom
- react-hook-form
- react-redux
- react-router-dom
- redux
- redux-devtools-extension

## Dev Dependencies

- eslint

## Why React?

For the myVHS application, React would certainly be the best choice. It is not a particularly heavy application and does not have complex user interfaces, nor does it have to display a large amount of data to the user from the server-side. Angular (and the MEAN stack) is therefore out of the question, as it would slow down the workflow.

On the other hand, Vue.js (and the MEVN stack) could be considered for the project, as being lightweight, progressive and versatile, it would allow to start easily and then keep adding enhancements in the future. However, I think React (and the MERN stack) would be better suited to the requirements of this application, mainly because it is currently the most popular framework designed for visualizing user interfaces.

By having its virtual DOM, it will allow the myVHS application to render views faster and more efficiently. We will have to load a lot of data from the server-side, so it is better to be certain from the beginning that the framework to be used will be able to deal with the high database load by users in the future.

Another advantage is that React prioritizes the user experience, which is one of the main goals of the myFlix application: to display in a simple and intuitive way information about movies to the user.

## Server-side

To see the Server-side of the app, please check [this repository](https://github.com/gregoriodelasheras/myvhs-server).

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Francisco Gregorio de las Heras: [LinkedIn](https://www.linkedin.com/in/francisco-gregorio-de-las-heras/)

Project Link: [https://gregoriodelasheras.github.io/myvhs-client/](https://gregoriodelasheras.github.io/myvhs-client/)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Itua Akhator](https://github.com/iakhator)
- [Vinh-Tuong Mai](https://github.com/mvtuong)
