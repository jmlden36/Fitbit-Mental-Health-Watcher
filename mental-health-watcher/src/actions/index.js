import * as c from './ActionTypes';

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const deleteEvent = id => ({
  type: c.DELETE_EVENT,
  id
});

export const addEvent = (eventHR) => {
  const { date, startTime, stopTime, id } = eventHR;
  return {
    type: c.ADD_EVENT,
    date: date,
    startTime: startTime,
    stopTime: stopTime,
    id: id
  }
}