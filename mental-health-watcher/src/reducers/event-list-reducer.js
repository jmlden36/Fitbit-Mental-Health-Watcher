import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { date, startTime, stopTime, id } = action;
  switch (action.type) {
    case c.ADD_EVENT:
      return Object.assign({}, state, {
        [id]: {
          date: date,
          startTime: startTime,
          stopTime: stopTime,
          id: id
        }
      });
    case c.DELETE_EVENT:
      const newState = { ...state };
      delete newState[id];
      return newState;
  default:
    return state;
  }
};