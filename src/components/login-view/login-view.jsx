import React, { useState } from 'react';
import axiosInstance from '../../config';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../../actions/actions';
import { useForm } from 'react-hook-form';
import { Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';

export function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // React-Bootstrap Modal
  const [modalErrorShow, setModalErrorShow] = React.useState(false);

  // React-Redux
  const dispatch = useDispatch();

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // API authentication request
  const OnSubmit = () => {
    axiosInstance
      .post('/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        const authData = response.data;
        onLogged(authData);
      })
      .catch((e) => {
        console.log(e);
        setModalErrorShow(true);
      });
  };

  // Dispatch data to the Redux store, save username and token in local storage and redirect to the movie page
  function onLogged(authData) {
    dispatch(setUser(authData));
    localStorage.setItem('token', JSON.stringify(authData.token));
    localStorage.setItem('user', JSON.stringify(authData.user.username));
    window.open('/movies', '_self');
  }

  // Set Modal to display errors to the user
  function ModalError(props) {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header className='modalUser'>
          <Modal.Title id='contained-modal-title-vcenter'>
            &quot;Houston, we have a problem!&quot;
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalUser'>
          <p className='h4 my-3'>We haven&apos;t found you 😅</p>
          <p>
            Sorry. The username entered doesn&apos;t exist or the password is
            incorrect.
          </p>
          <p>Please try again!</p>
        </Modal.Body>
        <Modal.Footer className='modalUser justify-content-center'>
          <Button
            variant='outline-info'
            className='btn-form'
            onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className='main-view text-center d-flex justify-content-center align-items-center'>
      <Row className='w-100'>
        <Col>
          <Form onSubmit={handleSubmit(OnSubmit)}>
            <h1 className='mb-4'>Login</h1>
            <Form.Group controlId='formUsername' className='my-4'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                {...register('username', {
                  required: {
                    value: true,
                    message: 'You need to enter your username to login!',
                  },
                  minLength: {
                    value: 6,
                    message:
                      'Please enter your username (at least 6 characters)',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9_]+$/i,
                    message:
                      'Usernames should follow this pattern: A-Z, a-z, 0-9 and special character "_"',
                  },
                })}
                type='text'
                value={username}
                placeholder='Enter your username'
                className='form-neon'
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.username.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='formPassword' className='my-4'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                {...register('password', {
                  required: {
                    value: true,
                    message: 'You need to enter your password to login!',
                  },
                  minLength: {
                    value: 8,
                    message:
                      'Please enter your password (at least 8 characters)',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9@#$%!?]+$/i,
                    message:
                      'Passwords should follow this pattern: A-Z, a-z, 0-9 and special characters "@ # $ % ! ?"',
                  },
                })}
                type='password'
                value={password}
                placeholder='Enter your password'
                className='form-neon'
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.password.message}
                </Alert>
              )}
            </Form.Group>
            <Button type='submit' variant='outline-info' className='btn-form'>
              Submit
            </Button>
          </Form>
          <ModalError
            show={modalErrorShow}
            onHide={() => setModalErrorShow(false)}
          />
        </Col>
      </Row>
    </div>
  );
}

LoginView.propTypes = {
  onHide: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return { user: dispatch.user };
};

export default connect(mapDispatchToProps, { setUser })(LoginView);
