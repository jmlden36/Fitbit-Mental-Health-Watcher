import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function EditEventForm (props) {
  const firestore = useFirestore();
  const { eventHR } = props;
  function handleEditEventFormSubmission(event) {
    event.preventDefault();
    props.onEditEvent();
    const propertiesToUpdate = {
      date: event.target.date.value,
      startTime: event.target.startTime.value,
      stopTime: event.target.stopTime.value,
      notes: event.target .notes.value
    }
    return firestore.update({collection: 'events', doc: eventHR.id }, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <ReusableForm
      formSubmissionHandler={handleEditEventFormSubmission}
      buttonText= "Update" />
    </React.Fragment>
  );
}

EditEventForm.propTypes = {
  onEditEvent: PropTypes.func
};

export default EditEventForm;