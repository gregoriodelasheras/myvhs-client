import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import logo from 'url:../../assets/logo.svg';

// Component containing the "About" page
export default function AboutView() {
  return (
    <div className='main-view text-center d-flex justify-content-center align-items-center'>
      <Row className='align-items-center'>
        <Col>
          <img src={logo} alt='Logo' className='img-fluid logo-web' />
          <p className='h2 my-4'>
            Web App for enthusiasts of 80&apos;s movies.
          </p>
          <p className='h4 my-4'>
            All in one VHS! Built with its own API and the MERN stack.
          </p>
          <Alert className='alert-info my-4' variant='alert'>
            <p className=''>Want to know more about the project?</p>
            <p className='h6'>Repositories on GitHub:</p>
            <a
              href='https://github.com/gregoriodelasheras/myvhs-server'
              className='badge badge-info m-2'
              target='_blank'
              rel='noreferrer'>
              myVHS Server-Side
            </a>
            <a
              href='https://github.com/gregoriodelasheras/myvhs-client'
              className='badge badge-info m-2'
              target='_blank'
              rel='noreferrer'>
              myVHS Client-Side
            </a>
            <a
              href='https://github.com/gregoriodelasheras?tab=repositories'
              className='badge badge-info m-2'
              target='_blank'
              rel='noreferrer'>
              Other projects
            </a>
          </Alert>
        </Col>
      </Row>
    </div>
  );
}
