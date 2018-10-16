import { Provider } from 'react-redux';
import store from './src/redux/Store';
import { AppRegistry } from 'react-native';
import React, {Component} from 'react';

import AppViewContainer from './src/containers/AppViewContainer';

class News extends Component {
    render() {
      return (
        <Provider store={store}>
          <AppViewContainer />
        </Provider>
      );
    }
}

AppRegistry.registerComponent('News', () => News);
