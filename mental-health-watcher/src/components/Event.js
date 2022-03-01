import React from "react";
import PropTypes from "prop-types";

function Event(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenEventClicked(props.id)}>
        <h3>Start time: {props.startTime}</h3>
        <h3>Stop time: {props.stopTime}</h3>
      </div>
      <hr />
  </React.Fragment>
  );
}

Event.propTypes = {
  startTime: PropTypes.string,
  stopTime: PropTypes.string,
  notes: PropTypes.string,
  data: PropTypes.string,
  id: PropTypes.string,
  whenEventClicked: PropTypes.func
};

export default Event;