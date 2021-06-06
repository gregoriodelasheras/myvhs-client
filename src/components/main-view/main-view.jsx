import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import logo from 'url:../../assets/logo.svg';

export default function MainView() {
  let infoGuest;
  let accessToken = localStorage.getItem('token');

  if (!accessToken) {
    infoGuest = (
      <Alert className='alert-info' variant='alert'>
        <div>
          Join our exclusive club for free and get access to the best 80s movie
          information page.
        </div>
        <div>
          Click <a href='/register'>here to sign up</a> or{' '}
          <a href='/login'>here to login</a>!
        </div>
      </Alert>
    );
  }

  return (
    <div className='main-view text-center d-flex justify-content-center align-items-center'>
      <Row className='w-100'>
        <Col>
          <img src={logo} alt='Logo' className='img-fluid logo-web' />
          <p className='h1 my-4'>Welcome to myVHS!</p>
          <p className='h4 my-4'>
            Get comfy, grab your favorite snacks and get ready for an exciting
            trip right back to the mind-blowing decade of the 80&apos;s!
          </p>
          {infoGuest}
          <p className='text-muted my-4'>(We bring the popcorn! 🍿)</p>
        </Col>
      </Row>
    </div>
  );
}
