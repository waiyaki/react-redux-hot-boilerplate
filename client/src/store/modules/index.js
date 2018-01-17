import { combineReducers } from 'redux';

export default combineReducers({
  test: (state = { name: "World" }, action) => state
})
