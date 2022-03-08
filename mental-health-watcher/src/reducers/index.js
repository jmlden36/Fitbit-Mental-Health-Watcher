import formVisibleReducer from './form-visible-reducer';
import eventListReducer from './event-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainEventList: eventListReducer,
  firestore: firestoreReducer
});

export default rootReducer;