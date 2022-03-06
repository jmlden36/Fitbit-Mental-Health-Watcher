export const toggleForm = () => ({
  type: 'TOGGLE_FORM'
});

export const addEvent = (event) => {
  const { startTime, stopTime, notes, id } = event;
  return {
    type: 'ADD_EVENT',
    startTime: startTime,
    stopTime: stopTime,
    notes: notes,
    id: id
  }
}