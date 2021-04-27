import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      console.log(`Username: ${username} | Password: ${password}`);
      props.onLoggedIn(username && password);
      console.log(
        `Sorry, the username you have entered, "${username}", doesn't exist in our database. Please register to start using our wonderful App!`,
      );
    } else {
      console.log('Please enter your username and password.');
    }
  };

  return (
    <form>
      <div>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  onLoggedIn: PropTypes.func.isRequired,
};
