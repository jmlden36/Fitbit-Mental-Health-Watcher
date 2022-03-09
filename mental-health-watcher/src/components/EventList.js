import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function EventList(props){
  useFirestoreConnect([
    { collection: 'events' }
  ]);

  const events = useSelector(state => state.firestore.ordered.events);

  if (isLoaded(events)) {
    return (
      <React.Fragment>
      <hr/>
      {events.map((event) =>
        <Event
          whenEventClicked = { props.onEventSelection }
          date={event.date}
          startTime={event.startTime}
          stopTime={event.stopTime}
          notes={event.notes}
          id={event.id}
          key={event.id}/>
      )}
    </React.Fragment>
  );
} else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}
    

EventList.propTypes = {
  onEventSelection: PropTypes.func
};

export default EventList;