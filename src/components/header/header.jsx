import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

export default function Header() {
  let accessToken = JSON.parse(localStorage.getItem('token'));
  let accessUsername = JSON.parse(localStorage.getItem('user'));
  let urlProfile = `/users/${accessUsername}`;
  let buttonMenu;
  let button1;
  let button2;
  let buttonFav;
  let buttonWat;

  // Shows different buttons if a user is logged in or not
  if (!accessToken) {
    // User not logged: shows login or signup button
    button1 = (
      <Button href='/login' className='btn-header mx-3' variant='outline-info'>
        Log in
      </Button>
    );
    button2 = (
      <Button
        href='/register'
        className='btn-header mx-3'
        variant='outline-info'
        onClick={onLoggedOut}>
        Sign up
      </Button>
    );
  } else {
    // User logged: shows app nav menu, favorite, to watch, profile and logout buttons
    buttonMenu = (
      <NavDropdown title='Show' id='basic-nav-dropdown'>
        <NavDropdown.Item href='/movies'>Movies</NavDropdown.Item>
        <NavDropdown.Item href='/genres'>Genres</NavDropdown.Item>
        <NavDropdown.Item href='/directors'>Directors</NavDropdown.Item>
        <NavDropdown.Item href='/actors'>Actors</NavDropdown.Item>
      </NavDropdown>
    );
    buttonFav = (
      <Button
        href={`${urlProfile}/favorite`}
        className='btn-profile4 mx-2'
        variant='outline-warning'>
        Favorite
      </Button>
    );
    buttonWat = (
      <Button
        href={`${urlProfile}/towatch`}
        className='btn-profile5 mx-2'
        variant='outline-primary'>
        To Watch
      </Button>
    );
    button1 = (
      <Button
        href={urlProfile}
        className='btn-header mx-2'
        variant='outline-info'>
        {accessUsername}
      </Button>
    );
    button2 = (
      <Button
        href='/'
        className='btn-header mx-2'
        variant='outline-info'
        onClick={onLoggedOut}>
        Log out
      </Button>
    );
  }

  // Logout removes the username and access token from local storage
  function onLoggedOut() {
    localStorage.clear();
  }

  // Render the navigation bar
  return (
    <div className='main-header fixed-top bg-dark'>
      <Container>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Navbar.Brand href='/'>myVHS</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='text-center' id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/about'>About</Nav.Link>
              {buttonMenu}
            </Nav>
            <Nav className='justify-content-center flex-row py-2'>
              {buttonFav}
              {buttonWat}
            </Nav>
            <Nav className='justify-content-center flex-row py-2'>
              {button1}
              {button2}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
