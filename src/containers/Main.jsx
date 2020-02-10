import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import routes from 'config/routes';

//@inject()
@observer
class Main extends Component {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    // TODO: Fetch data from back-end
    this.setState({ loaded: true });
  }

  render() {
    if (!this.state.loaded) {
      return null; // TODO replace by loader
    }

    return (
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              exact
              render={props => 
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              }
            />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default Main;
