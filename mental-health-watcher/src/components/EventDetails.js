import React from "react";
import PropTypes from "prop-types";

function EventDetail(props){
  const { event } = props;

  return (
    <React.Fragment>
      <h3>Start time: {event.startTime}</h3>
      <h3>Stop time: {event.stopTime}</h3>
      <h3>Data: {event.data}</h3>
      <hr/>
    </React.Fragment>
  );
}

EventDetail.propTypes = {
  event: PropTypes.object,
};

export default EventDetail;