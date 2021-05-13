import React from 'react';
import axiosInstance from '../../config';
import { Row, Col, Button, ButtonGroup, Alert, Modal } from 'react-bootstrap';

export default class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      bday: '',
    };
  }

  async componentDidMount() {
    const accessUsername = JSON.parse(localStorage.getItem('user'));

    const userResponse = await axiosInstance.get(`/users/${accessUsername}`);

    const [user] = await Promise.all([userResponse]);

    this.setState({
      user: user.data,
      bday: user.data.birthday.slice(0, 10),
    });
  }

  render() {
    const { user, bday } = this.state;

    function RedirectFavorite() {
      window.open(`/users/${user.username}/favorite`, '_self');
    }

    function RedirectToWatch() {
      window.open(`/users/${user.username}/towatch`, '_self');
    }

    function RedirectEdit() {
      window.open(`/users/${user.username}/edit`, '_self');
    }

    function RedirectShow() {
      window.open(`/users/${user.username}`, '_self');
    }

    function DeleteUserModal(props) {
      return (
        <Modal
          {...props}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered>
          <Modal.Body className='modalDeleteUser text-center'>
            <p className='h3 my-4'>⚠ Warning! ⚠</p>
            <p className='h5 my-3'>
              You are very close to delete your profile 😱
            </p>
            <p>
              You will lose all your data and lists of your favorite and
              to-be-watched movies. Of course, you will always be welcome back
              in the future.
            </p>
            <p className='h5'>Are you sure you want to do it?</p>
            <Button
              className='btn-delete-user my-2 mx-2'
              variant='success'
              onClick={props.onHide}>
              No! Please take me back!
            </Button>
            <Button
              className='btn-delete-user my-2 mx-2'
              variant='danger'
              onClick={() => DeleteUser(false)}>
              Yes! I want to delete my profile!
            </Button>
          </Modal.Body>
        </Modal>
      );
    }

    function DeleteButton() {
      const [modalShow, setModalShow] = React.useState(false);

      return (
        <>
          <Button
            className='btn-profile3'
            variant='outline-danger'
            onClick={() => setModalShow(true)}>
            Delete
          </Button>

          <DeleteUserModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      );
    }

    function DeleteUser() {
      const urlProfile = `https://myvhs.herokuapp.com/users/${user.username}`;

      axiosInstance
        .delete(urlProfile)
        .then(() => {
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <div className='main-view profile-container text-center'>
        <Row className='justify-content-md-center'>
          <Col>
            <h1 className='my-4'>Profile</h1>
            <ButtonGroup className='mb-4'>
              <Button
                className='btn-profile1'
                variant='outline-info'
                onClick={() => RedirectEdit()}>
                Edit
              </Button>
              <Button
                className='btn-profile2'
                variant='outline-success'
                onClick={() => RedirectShow()}>
                Show
              </Button>
              <DeleteButton />
            </ButtonGroup>
            <Alert className='alert-info m-0' variant='alert'>
              <div className='username'>
                <p className='font-weight-bold my-2'>Username: </p>
                <p className='mb-4'>{user.username}</p>
              </div>
              <div className='name'>
                <p className='font-weight-bold my-2'>Name: </p>
                <p className='mb-4'>{user.name}</p>
              </div>
              <div className='lastName'>
                <p className='font-weight-bold my-2'>Last Name: </p>
                <p className='mb-4'>{user.lastName}</p>
              </div>
              <div className='birthday'>
                <p className='font-weight-bold my-2'>Birthday: </p>
                <p className='mb-4'>{bday}</p>
              </div>
              <div className='country'>
                <p className='font-weight-bold my-2'>Country: </p>
                <p className='mb-4'>{user.country}</p>
              </div>
              <div className='email'>
                <p className='font-weight-bold my-2'>E-mail: </p>
                <p className='mb-4'>{user.email}</p>
              </div>
            </Alert>
            <Button
              className='btn-profile4 my-4 mx-2'
              variant='outline-warning'
              onClick={() => RedirectFavorite()}>
              Favorite
            </Button>
            <Button
              className='btn-profile4 my-4 mx-2'
              variant='outline-warning'
              onClick={() => RedirectToWatch()}>
              To Watch
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
