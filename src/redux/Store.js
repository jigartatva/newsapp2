import { applyMiddleware, createStore, compose } from 'redux'
import * as reduxLoop from 'redux-loop-symbol-ponyfill'
import middleware from './Middleware'
import reducer from './Reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/Index'
const sagaMiddleware = createSagaMiddleware()
// middleware[sagaMiddleware];

const enhancers = [
  applyMiddleware(...middleware, sagaMiddleware),
  reduxLoop.install()
]

/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
const composeEnhancers = (
  __DEV__ &&
  typeof (window) !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers)

// create the store
const store = createStore(
  reducer,
  null,
  enhancer
)

sagaMiddleware.run(rootSaga)
export default store
