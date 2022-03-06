import formVisibleReducer from './form-visible-reducer';
import eventListReducer from './event-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainEventList: eventListReducer
});

export default rootReducer;