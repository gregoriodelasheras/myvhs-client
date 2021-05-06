import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function AboutView() {
  return (
    <div className='main-view text-center d-flex justify-content-center align-items-center'>
      <Row className='align-items-center'>
        <Col>
          <img
            src='https://raw.githubusercontent.com/gregoriodelasheras/myVHS-client/69e6feb322c09cf53547384507db20581274f0b2/img/logo.svg'
            alt='Logo'
            className='img-fluid logo-web'
          />
          <p className='h2 my-4'>
            Web App for enthusiasts of 80&apos;s movies.
          </p>
          <p className='h4 my-4'>
            All in one VHS! Built with its own API and the MERN stack.
          </p>
          <div className='alert alert-info my-4' role='alert'>
            <p className=''>Want to know more about the project?</p>
            <p className='h6'>Repositories on GitHub:</p>
            <a
              href='https://github.com/gregoriodelasheras/myVHS-server'
              className='badge badge-info m-2'
              target='_blank'
              rel='noreferrer'>
              myVHS Server-Side
            </a>
            <a
              href='https://github.com/gregoriodelasheras/myVHS-client'
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
          </div>
        </Col>
      </Row>
    </div>
  );
}
