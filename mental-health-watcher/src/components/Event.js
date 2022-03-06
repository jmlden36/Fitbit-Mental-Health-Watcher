import React from "react";
import PropTypes from "prop-types";

function Event(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenEventClicked(props.id)}>
        <h3>{props.startTime} - {props.stopTime}</h3>
        <p><em>{props.notes}</em></p>
      </div>
      <hr/>
    </React.Fragment>
  );
}

Event.propTypes = {
  startTime: PropTypes.string,
  stopTime: PropTypes.string,
  notes: PropTypes.string,
  id: PropTypes.string,
  whenEventClicked: PropTypes.func
};

export default Event;