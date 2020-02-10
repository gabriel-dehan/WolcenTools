/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { inject, observer } from 'mobx-react';

import {
} from './Layout.styles';

class Layout extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Layout);