import { Map, fromJS } from 'immutable'
import { loop, combineReducers } from 'redux-loop-symbol-ponyfill'
import SessionStateReducer, { RESET_STATE } from '../containers/session/SessionState'
// ## Generator Reducer Imports
import appReducer from './Services'
import newsReducer from '../redux/NewsAuthAPI'
import NewsAuthStateReducer from '../redux/NewsAuthAPI'

const reducers = {
  // ## Generator Reducers
  newsAuth: NewsAuthStateReducer,
  // Navigator states
  session: SessionStateReducer,
  appReducer: appReducer,
  newsReducer: newsReducer
}

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map()
const getImmutable = (child, key) => child ? child.get(key) : void 0
const setImmutable = (child, key, value) => child.set(key, value)

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
)

export default function mainReducer (state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action)

  // enforce the state is immutable
  return loop(fromJS(nextState), effects)
}
