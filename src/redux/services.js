import { Map } from 'immutable'
const SET_LOADER = 'SET_LOADER'

/* Set loader */
export const setLoader = (value) => ({ type: SET_LOADER, payload: value })

/* Initial state */
const initialState = Map({
  loading: false
})

/* Reducer */
export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOADER:
      return state.set('loading', action.payload)
    default:
      return state
  }
}
