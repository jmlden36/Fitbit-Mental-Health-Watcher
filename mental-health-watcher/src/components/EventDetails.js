import React from "react";
import PropTypes from "prop-types";

function EventDetail(props){
  const { event } = props;
  
  return (
    <React.Fragment>
      <h1>Event Detail</h1>
      <h3>{event.startTime} - {event.stopTime}</h3>
      <p><em>{event.notes}</em></p>
      <h3>this is where the HR data will go</h3>
      <hr/>
    </React.Fragment>
  );
}

EventDetail.propTypes = {
  event: PropTypes.object,
};

export default EventDetail;