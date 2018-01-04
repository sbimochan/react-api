import React from 'react';
import LoginForm from './LoginForm';
import * as axios from '../services/api';
import { connect } from 'react-redux';
import * as todoActions from './actions/action';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const handleLogin = (values) => {
    values.preventDefault();
    const username = values.target.username.value;
    const password = values.target.password.value;
    // console.log(password);

    const data = {
      username: username,
      password: password,
    };
    axios
      .login('login', data)
      .then((response) => {
        const { accessToken, refreshToken, userId } = response;
        // console.log(userId);
        localStorage.setItem('userId', userId);
        localStorage.setItem('isAuth', true);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        props.dispatch(todoActions.isAuth(true));
        props.dispatch(todoActions.userId(userId));
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 404') {
          console.log('User not found');
        }
      });
  };
  if(props.isAuth=== true){
    return <Redirect to= '/todo'/>;
  }  else{

    return <LoginForm handleLogin={handleLogin} />;
  }
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(Login);
