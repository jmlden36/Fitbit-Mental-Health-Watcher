import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";

function EventList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.eventList.map((event) =>
        <Event
          whenEventClicked = { props.onEventSelection }
          startTime={event.startTime}
          stopTime={event.stopTime}
          notes={event.notes}
          id={event.id}
          key={event.id}/>
      )}
    </React.Fragment>
  );
}

EventList.propTypes = {
  eventList: PropTypes.array,
  onEventSelection: PropTypes.func
};

export default EventList;