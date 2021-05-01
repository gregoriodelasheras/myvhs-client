import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap';
import './header.scss';

export default function Header() {
  return (
    <div className='main-header fixed-top bg-dark'>
      <Container>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Navbar.Brand href='/'>myVHS</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/about'>About</Nav.Link>
              <NavDropdown title='Show' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/movies'>Movies</NavDropdown.Item>
                <NavDropdown.Item href='/genres'>Genres</NavDropdown.Item>
                <NavDropdown.Item href='/directors'>Directors</NavDropdown.Item>
                <NavDropdown.Item href='/actors'>Actors</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
              />
              <Button variant='outline-info'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
