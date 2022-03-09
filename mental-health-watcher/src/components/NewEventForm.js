import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';


function NewEventForm(props){
  
  const firestore = useFirestore();
  function addEventToFirestore(event) {
    event.preventDefault();
    props.onNewEventCreation();
    
    return firestore.collection('events').add(
      {
        date: event.target.date.value,
        startTime: event.target.startTime.value,
        stopTime: event.target.stopTime.value,
        notes: event.target.notes.value,
        //possibly add a date property to make the api call specific to a day and time instead of just today and time.  Need this for future viewing
      }
    );
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addEventToFirestore}
        buttonText="Make new Event" />
    </React.Fragment>
  );
}

NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func
};

export default NewEventForm;