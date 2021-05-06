import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <div className='main-footer bg-dark pt-3'>
      <Container>
        <Row>
          <Col className='text-center'>
            <p>
              Made with ❤ by{' '}
              <a
                href='https://gregoriodelasheras.github.io/'
                target='_blank'
                rel='noreferrer'
                className='link-light'>
                Francisco Gregorio de las Heras
              </a>
            </p>
            <p>
              Latest version:{' '}
              <a
                href='https://github.com/gregoriodelasheras/myVHS-client/releases/latest'
                target='_blank'
                rel='noreferrer'>
                v.1.0.3
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
