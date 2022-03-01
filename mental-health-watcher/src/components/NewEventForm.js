import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';

function NewTicketForm(props){
  const firestore = useFirestore();
  function addEventToFirestore(event) {
    event.preventDefault();
    props.onNewEventCreation();
    return firestore.collection('events').add(
      {
        startTime: event.target.startTime.value,
        stopTime: event.target.stopTime.value, 
        notes: event.target.notes.value
      }
    );
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addEventToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewEventCreation: PropTypes.func
};

export default NewEventForm;