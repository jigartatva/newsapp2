import React from 'react';
import FilterView from '../../src/containers/screens/Filter/FilterView';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';
import { shallow, configure } from 'enzyme'

// fix Enzyme to work with React 16 as per https://github.com/airbnb/enzyme#installation
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
//const store = configureStore();

import renderer from 'react-test-renderer';

