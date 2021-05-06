import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

export default function Header() {
  let accessToken = localStorage.getItem('token');
  let accesUsername = localStorage.getItem('user');
  let urlProfile = `/users/${localStorage.getItem('user')}`;
  let buttonMenu;
  let button1;
  let button2;
  let buttonFav;
  let buttonWat;

  if (!accessToken) {
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
        className='btn-profile4 mx-2'
        variant='outline-warning'>
        To Watch
      </Button>
    );
    button1 = (
      <Button
        href={urlProfile}
        className='btn-header mx-2'
        variant='outline-info'>
        {accesUsername}
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

  function onLoggedOut() {
    localStorage.clear();
  }

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
