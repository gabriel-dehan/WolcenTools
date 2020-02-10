import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

 import notificationStore from 'stores/notification';
import Main from 'containers/Main';
import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

@observer
class App extends Component {
  state = {
    loaded: false,
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  get stores() {
    return {
      notificationStore,
    };
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    return (
      <>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Provider {...this.stores}>
            <Main />
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
