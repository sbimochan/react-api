import React from 'react';

const LoginForm = props => {
  
  return (
    <div>
      <form onSubmit={props.handleLogin} method="post">
        <label>username</label>
        <input type="text" name="username" />
        <label>password</label>
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default LoginForm;
