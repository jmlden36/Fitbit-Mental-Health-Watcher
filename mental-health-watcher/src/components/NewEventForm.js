import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewEventForm(props){

  function handleNewEventFormSubmission(event) {
    event.preventDefault();
    props.onNewEventCreation({startTime: event.target.startTime.value, stopTime: event.target.stopTime.value, notes: event.target.notes.value, id: v4()});
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewEventFormSubmission}
        buttonText="Make new Event" />
    </React.Fragment>
  );
}

NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func
};

export default NewEventForm;