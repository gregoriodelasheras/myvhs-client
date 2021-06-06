import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../../config';
import { useForm } from 'react-hook-form';
import { Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';

// Component that allows the user to sign up to the page
export default function RegistrationView() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // React-Bootstrap Modal
  const [modalRedirectShow, setModalRedirectShow] = React.useState(false);
  const [modalErrorShow, setModalErrorShow] = React.useState(false);

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // API authentication request
  const OnSubmit = () => {
    axiosInstance
      .post('/users', {
        name: name,
        lastName: lastName,
        birthday: birthday,
        country: country,
        email: email,
        username: username,
        password: password,
      })
      .then(() => {
        setModalRedirectShow(true);
      })
      .catch((e) => {
        console.log(e);
        setModalErrorShow(true);
      });
  };

  // Redirects the user to the login view after successful posting data to the API
  function RedirectLogin() {
    window.open('/login', '_self');
  }

  // Set Modal to inform the user about the success of the data posting request
  function ModalRedirect(props) {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        backdrop='static'
        keyboard={false}>
        <Modal.Header className='modalUser'>
          <Modal.Title id='contained-modal-title-vcenter'>
            Everything is ready!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalUser'>
          <p className='h4 my-3'>Thank you for signing up with us! 🥳</p>
          <p>
            The registration was successful! After closing this message you will
            be redirected to the main page. Now you can login with your profile
            and start exploring the wonderful world of 80&apos;s movies!
          </p>
          <p>So what are you waiting for? On your marks, get set...</p>
        </Modal.Body>
        <Modal.Footer className='modalUser justify-content-center'>
          <Button
            variant='outline-info'
            className='btn-form'
            onClick={() => RedirectLogin()}>
            Go!
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
          <p className='h4 my-3'>Your username already exists! 😬</p>
          <p>
            Sorry, the username is already registered. Please enter another one.
          </p>
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
    <div className='main-view text-center'>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(OnSubmit)}>
            <h1 className='my-4'>Sign Up</h1>
            <Form.Group controlId='formName' className='my-4'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                {...register('name', {
                  required: {
                    value: true,
                    message: 'You must enter your name in order to register!',
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ž\s]+$/i,
                    message: 'The name contains invalid characters.',
                  },
                })}
                type='text'
                value={name}
                placeholder='Enter your name'
                className='form-neon'
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.name.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='formLastName' className='my-4'>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                {...register('lastName', {
                  required: {
                    value: true,
                    message:
                      'You must enter your last name in order to register!',
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ž\s]+$/i,
                    message: 'The last name contains invalid characters.',
                  },
                })}
                type='text'
                value={lastName}
                placeholder='Enter your last name'
                className='form-neon'
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.lastName.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='formBirthday' className='my-4'>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                {...register('birthday', {
                  required: {
                    value: true,
                    message:
                      'You must enter your birthday in order to register!',
                  },
                })}
                type='date'
                value={birthday}
                className='form-neon'
                onChange={(e) => setBirthday(e.target.value)}
              />
              {errors.birthday && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.birthday.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='formCountry' className='my-4'>
              <div>
                <Form.Label>Country:</Form.Label>
              </div>
              <Form.Control
                {...register('country', {
                  required: {
                    value: true,
                    message:
                      'You must enter your country in order to register!',
                  },
                })}
                as='select'
                value={country}
                className='form-neon'
                onChange={(e) => setCountry(e.target.value)}>
                <option value=''>Choose country</option>
                <option value='Afghanistan'>Afghanistan</option>
                <option value='Åland Islands'>Åland Islands</option>
                <option value='Albania'>Albania</option>
                <option value='Algeria'>Algeria</option>
                <option value='American Samoa'>American Samoa</option>
                <option value='Andorra'>Andorra</option>
                <option value='Angola'>Angola</option>
                <option value='Anguilla'>Anguilla</option>
                <option value='Antarctica'>Antarctica</option>
                <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                <option value='Argentina'>Argentina</option>
                <option value='Armenia'>Armenia</option>
                <option value='Aruba'>Aruba</option>
                <option value='Australia'>Australia</option>
                <option value='Austria'>Austria</option>
                <option value='Azerbaijan'>Azerbaijan</option>
                <option value='Bahamas'>Bahamas</option>
                <option value='Bahrain'>Bahrain</option>
                <option value='Bangladesh'>Bangladesh</option>
                <option value='Barbados'>Barbados</option>
                <option value='Belarus'>Belarus</option>
                <option value='Belgium'>Belgium</option>
                <option value='Belize'>Belize</option>
                <option value='Benin'>Benin</option>
                <option value='Bermuda'>Bermuda</option>
                <option value='Bhutan'>Bhutan</option>
                <option value='Bolivia'>Bolivia</option>
                <option value='Bosnia and Herzegovina'>
                  Bosnia and Herzegovina
                </option>
                <option value='Botswana'>Botswana</option>
                <option value='Bouvet Island'>Bouvet Island</option>
                <option value='Brazil'>Brazil</option>
                <option value='British Indian Ocean Territory'>
                  British Indian Ocean Territory
                </option>
                <option value='Brunei Darussalam'>Brunei Darussalam</option>
                <option value='Bulgaria'>Bulgaria</option>
                <option value='Burkina Faso'>Burkina Faso</option>
                <option value='Burundi'>Burundi</option>
                <option value='Cambodia'>Cambodia</option>
                <option value='Cameroon'>Cameroon</option>
                <option value='Canada'>Canada</option>
                <option value='Cape Verde'>Cape Verde</option>
                <option value='Cayman Islands'>Cayman Islands</option>
                <option value='Central African Republic'>
                  Central African Republic
                </option>
                <option value='Chad'>Chad</option>
                <option value='Chile'>Chile</option>
                <option value='China'>China</option>
                <option value='Christmas Island'>Christmas Island</option>
                <option value='Cocos (Keeling) Islands'>
                  Cocos (Keeling) Islands
                </option>
                <option value='Colombia'>Colombia</option>
                <option value='Comoros'>Comoros</option>
                <option value='Congo'>Congo</option>
                <option value='Congo, The Democratic Republic of The'>
                  Congo, The Democratic Republic of The
                </option>
                <option value='Cook Islands'>Cook Islands</option>
                <option value='Costa Rica'>Costa Rica</option>
                <option value="Cote D\'ivoire">Cote D`ivoire</option>
                <option value='Croatia'>Croatia</option>
                <option value='Cuba'>Cuba</option>
                <option value='Cyprus'>Cyprus</option>
                <option value='Czech Republic'>Czech Republic</option>
                <option value='Denmark'>Denmark</option>
                <option value='Djibouti'>Djibouti</option>
                <option value='Dominica'>Dominica</option>
                <option value='Dominican Republic'>Dominican Republic</option>
                <option value='Ecuador'>Ecuador</option>
                <option value='Egypt'>Egypt</option>
                <option value='El Salvador'>El Salvador</option>
                <option value='Equatorial Guinea'>Equatorial Guinea</option>
                <option value='Eritrea'>Eritrea</option>
                <option value='Estonia'>Estonia</option>
                <option value='Ethiopia'>Ethiopia</option>
                <option value='Falkland Islands (Malvinas)'>
                  Falkland Islands (Malvinas)
                </option>
                <option value='Faroe Islands'>Faroe Islands</option>
                <option value='Fiji'>Fiji</option>
                <option value='Finland'>Finland</option>
                <option value='France'>France</option>
                <option value='French Guiana'>French Guiana</option>
                <option value='French Polynesia'>French Polynesia</option>
                <option value='French Southern Territories'>
                  French Southern Territories
                </option>
                <option value='Gabon'>Gabon</option>
                <option value='Gambia'>Gambia</option>
                <option value='Georgia'>Georgia</option>
                <option value='Germany'>Germany</option>
                <option value='Ghana'>Ghana</option>
                <option value='Gibraltar'>Gibraltar</option>
                <option value='Greece'>Greece</option>
                <option value='Greenland'>Greenland</option>
                <option value='Grenada'>Grenada</option>
                <option value='Guadeloupe'>Guadeloupe</option>
                <option value='Guam'>Guam</option>
                <option value='Guatemala'>Guatemala</option>
                <option value='Guernsey'>Guernsey</option>
                <option value='Guinea'>Guinea</option>
                <option value='Guinea-bissau'>Guinea-bissau</option>
                <option value='Guyana'>Guyana</option>
                <option value='Haiti'>Haiti</option>
                <option value='Heard Island and Mcdonald Islands'>
                  Heard Island and Mcdonald Islands
                </option>
                <option value='Holy See (Vatican City State)'>
                  Holy See (Vatican City State)
                </option>
                <option value='Honduras'>Honduras</option>
                <option value='Hong Kong'>Hong Kong</option>
                <option value='Hungary'>Hungary</option>
                <option value='Iceland'>Iceland</option>
                <option value='India'>India</option>
                <option value='Indonesia'>Indonesia</option>
                <option value='Iran, Islamic Republic of'>
                  Iran, Islamic Republic of
                </option>
                <option value='Iraq'>Iraq</option>
                <option value='Ireland'>Ireland</option>
                <option value='Isle of Man'>Isle of Man</option>
                <option value='Israel'>Israel</option>
                <option value='Italy'>Italy</option>
                <option value='Jamaica'>Jamaica</option>
                <option value='Japan'>Japan</option>
                <option value='Jersey'>Jersey</option>
                <option value='Jordan'>Jordan</option>
                <option value='Kazakhstan'>Kazakhstan</option>
                <option value='Kenya'>Kenya</option>
                <option value='Kiribati'>Kiribati</option>
                <option value="Korea, Democratic People's Republic of">
                  Korea, Democratic People`s Republic of
                </option>
                <option value='Korea, Republic of'>Korea, Republic of</option>
                <option value='Kuwait'>Kuwait</option>
                <option value='Kyrgyzstan'>Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">
                  Lao People`s Democratic Republic
                </option>
                <option value='Latvia'>Latvia</option>
                <option value='Lebanon'>Lebanon</option>
                <option value='Lesotho'>Lesotho</option>
                <option value='Liberia'>Liberia</option>
                <option value='Libyan Arab Jamahiriya'>
                  Libyan Arab Jamahiriya
                </option>
                <option value='Liechtenstein'>Liechtenstein</option>
                <option value='Lithuania'>Lithuania</option>
                <option value='Luxembourg'>Luxembourg</option>
                <option value='Macao'>Macao</option>
                <option value='Macedonia, The Former Yugoslav Republic of'>
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value='Madagascar'>Madagascar</option>
                <option value='Malawi'>Malawi</option>
                <option value='Malaysia'>Malaysia</option>
                <option value='Maldives'>Maldives</option>
                <option value='Mali'>Mali</option>
                <option value='Malta'>Malta</option>
                <option value='Marshall Islands'>Marshall Islands</option>
                <option value='Martinique'>Martinique</option>
                <option value='Mauritania'>Mauritania</option>
                <option value='Mauritius'>Mauritius</option>
                <option value='Mayotte'>Mayotte</option>
                <option value='Mexico'>Mexico</option>
                <option value='Micronesia, Federated States of'>
                  Micronesia, Federated States of
                </option>
                <option value='Moldova, Republic of'>
                  Moldova, Republic of
                </option>
                <option value='Monaco'>Monaco</option>
                <option value='Mongolia'>Mongolia</option>
                <option value='Montenegro'>Montenegro</option>
                <option value='Montserrat'>Montserrat</option>
                <option value='Morocco'>Morocco</option>
                <option value='Mozambique'>Mozambique</option>
                <option value='Myanmar'>Myanmar</option>
                <option value='Namibia'>Namibia</option>
                <option value='Nauru'>Nauru</option>
                <option value='Nepal'>Nepal</option>
                <option value='Netherlands'>Netherlands</option>
                <option value='Netherlands Antilles'>
                  Netherlands Antilles
                </option>
                <option value='New Caledonia'>New Caledonia</option>
                <option value='New Zealand'>New Zealand</option>
                <option value='Nicaragua'>Nicaragua</option>
                <option value='Niger'>Niger</option>
                <option value='Nigeria'>Nigeria</option>
                <option value='Niue'>Niue</option>
                <option value='Norfolk Island'>Norfolk Island</option>
                <option value='Northern Mariana Islands'>
                  Northern Mariana Islands
                </option>
                <option value='Norway'>Norway</option>
                <option value='Oman'>Oman</option>
                <option value='Pakistan'>Pakistan</option>
                <option value='Palau'>Palau</option>
                <option value='Palestinian Territory, Occupied'>
                  Palestinian Territory, Occupied
                </option>
                <option value='Panama'>Panama</option>
                <option value='Papua New Guinea'>Papua New Guinea</option>
                <option value='Paraguay'>Paraguay</option>
                <option value='Peru'>Peru</option>
                <option value='Philippines'>Philippines</option>
                <option value='Pitcairn'>Pitcairn</option>
                <option value='Poland'>Poland</option>
                <option value='Portugal'>Portugal</option>
                <option value='Puerto Rico'>Puerto Rico</option>
                <option value='Qatar'>Qatar</option>
                <option value='Reunion'>Reunion</option>
                <option value='Romania'>Romania</option>
                <option value='Russian Federation'>Russian Federation</option>
                <option value='Rwanda'>Rwanda</option>
                <option value='Saint Helena'>Saint Helena</option>
                <option value='Saint Kitts and Nevis'>
                  Saint Kitts and Nevis
                </option>
                <option value='Saint Lucia'>Saint Lucia</option>
                <option value='Saint Pierre and Miquelon'>
                  Saint Pierre and Miquelon
                </option>
                <option value='Saint Vincent and The Grenadines'>
                  Saint Vincent and The Grenadines
                </option>
                <option value='Samoa'>Samoa</option>
                <option value='San Marino'>San Marino</option>
                <option value='Sao Tome and Principe'>
                  Sao Tome and Principe
                </option>
                <option value='Saudi Arabia'>Saudi Arabia</option>
                <option value='Senegal'>Senegal</option>
                <option value='Serbia'>Serbia</option>
                <option value='Seychelles'>Seychelles</option>
                <option value='Sierra Leone'>Sierra Leone</option>
                <option value='Singapore'>Singapore</option>
                <option value='Slovakia'>Slovakia</option>
                <option value='Slovenia'>Slovenia</option>
                <option value='Solomon Islands'>Solomon Islands</option>
                <option value='Somalia'>Somalia</option>
                <option value='South Africa'>South Africa</option>
                <option value='South Georgia and The South Sandwich Islands'>
                  South Georgia and The South Sandwich Islands
                </option>
                <option value='Spain'>Spain</option>
                <option value='Sri Lanka'>Sri Lanka</option>
                <option value='Sudan'>Sudan</option>
                <option value='Suriname'>Suriname</option>
                <option value='Svalbard and Jan Mayen'>
                  Svalbard and Jan Mayen
                </option>
                <option value='Swaziland'>Swaziland</option>
                <option value='Sweden'>Sweden</option>
                <option value='Switzerland'>Switzerland</option>
                <option value='Syrian Arab Republic'>
                  Syrian Arab Republic
                </option>
                <option value='Taiwan, Province of China'>
                  Taiwan, Province of China
                </option>
                <option value='Tajikistan'>Tajikistan</option>
                <option value='Tanzania, United Republic of'>
                  Tanzania, United Republic of
                </option>
                <option value='Thailand'>Thailand</option>
                <option value='Timor-leste'>Timor-leste</option>
                <option value='Togo'>Togo</option>
                <option value='Tokelau'>Tokelau</option>
                <option value='Tonga'>Tonga</option>
                <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                <option value='Tunisia'>Tunisia</option>
                <option value='Turkey'>Turkey</option>
                <option value='Turkmenistan'>Turkmenistan</option>
                <option value='Turks and Caicos Islands'>
                  Turks and Caicos Islands
                </option>
                <option value='Tuvalu'>Tuvalu</option>
                <option value='Uganda'>Uganda</option>
                <option value='Ukraine'>Ukraine</option>
                <option value='United Arab Emirates'>
                  United Arab Emirates
                </option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='United States'>United States</option>
                <option value='United States Minor Outlying Islands'>
                  United States Minor Outlying Islands
                </option>
                <option value='Uruguay'>Uruguay</option>
                <option value='Uzbekistan'>Uzbekistan</option>
                <option value='Vanuatu'>Vanuatu</option>
                <option value='Venezuela'>Venezuela</option>
                <option value='Viet Nam'>Viet Nam</option>
                <option value='Virgin Islands, British'>
                  Virgin Islands, British
                </option>
                <option value='Virgin Islands, U.S.'>
                  Virgin Islands, U.S.
                </option>
                <option value='Wallis and Futuna'>Wallis and Futuna</option>
                <option value='Western Sahara'>Western Sahara</option>
                <option value='Yemen'>Yemen</option>
                <option value='Zambia'>Zambia</option>
                <option value='Zimbabwe'>Zimbabwe</option>
              </Form.Control>
              {errors.country && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.country.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='formEmail' className='my-4'>
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                {...register('email', {
                  required: {
                    value: true,
                    message: 'You must enter your e-mail in order to register!',
                  },
                  pattern: {
                    value: /[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}/g,
                    message:
                      'Sorry, our verification system indicates that your email address is invalid.',
                  },
                })}
                type='email'
                value={email}
                placeholder='Enter your e-mail'
                className='form-neon'
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.email.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='formUsername' className='my-4'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                {...register('username', {
                  required: {
                    value: true,
                    message: 'You need to enter a username to sign up!',
                  },
                  minLength: {
                    value: 6,
                    message:
                      'Please enter a valid username (at least 6 characters)',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9_]+$/i,
                    message:
                      'Usernames should follow this pattern: A-Z, a-z, 0-9 and special character "_"',
                  },
                })}
                type='text'
                value={username}
                className='form-neon'
                placeholder='Enter a username'
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.username.message}
                </Alert>
              )}
              <p className='text-muted my-2'>
                Please enter a username with at least 6 characters (A-Z, a-z,
                0-9, _ )
              </p>
            </Form.Group>
            <Form.Group controlId='formPassword' className='my-4'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                {...register('password', {
                  required: {
                    value: true,
                    message: 'You need to enter a password to sign up!',
                  },
                  minLength: {
                    value: 8,
                    message:
                      'Please enter a valid password (at least 8 characters)',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9@#$%!?]+$/i,
                    message:
                      'Passwords should follow this pattern: A-Z, a-z, 0-9 and special characters "@ # $ % ! ?"',
                  },
                })}
                type='password'
                value={password}
                placeholder='Enter a password'
                className='form-neon'
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.password.message}
                </Alert>
              )}
              <p className='text-muted my-2'>
                Please enter a password with at least 8 characters (A-Z, a-z,
                0-9, @#$%!?)
              </p>
            </Form.Group>
            <Form.Group controlId='formPasswordConfirmation' className='my-4'>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                {...register('passwordConfirmation', {
                  required: {
                    value: true,
                    message: 'Please confirm the password!',
                  },
                  minLength: {
                    value: 8,
                    message:
                      'Please re-enter a password (at least 8 characters)',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9@#$%!?]+$/i,
                    message:
                      'Passwords should follow this pattern: A-Z, a-z, 0-9 and special characters "@ # $ % ! ?"',
                  },
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || 'Passwords should match!';
                    },
                  },
                })}
                type='password'
                placeholder='Confirm the password'
                className='form-neon'
              />
              {errors.passwordConfirmation && (
                <Alert variant='danger' className='alert-message my-2 p-1'>
                  {errors.passwordConfirmation.message}
                </Alert>
              )}
              <p className='text-muted my-2'>Please re-enter your password.</p>
            </Form.Group>
            <Button
              type='submit'
              variant='outline-info mb-4'
              className='btn-form'>
              Submit
            </Button>
          </Form>
          <ModalRedirect
            show={modalRedirectShow}
            onHide={() => setModalRedirectShow(false)}
          />
          <ModalError
            show={modalErrorShow}
            onHide={() => setModalErrorShow(false)}
          />
        </Col>
      </Row>
    </div>
  );
}

RegistrationView.propTypes = {
  onHide: PropTypes.func,
};
