import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Redirect to={{
      pathname: '/home',
      state: { from: this.props.location }
    }}
    />;
  }
}

export default Login;
