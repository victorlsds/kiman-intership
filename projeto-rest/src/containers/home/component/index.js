import React, { Component } from 'react';

import HomeLayout from 'components/layout/home';

class HomeComponent extends Component {
  render() {
    return (
      <HomeLayout
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default HomeComponent;
