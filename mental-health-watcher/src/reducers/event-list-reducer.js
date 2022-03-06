export default (state = {}, action) => {
  const { startTime, stopTime, notes, id } = action;
  switch (action.type) {
  case 'ADD_EVENT':
    return Object.assign({}, state, {
      [id]: {
        startTime: startTime,
        stopTime: stopTime,
        notes: notes,
        id: id
      }
    });
  default:
    return state;
  }
};