import React from "react";
import PropTypes from "prop-types";

function Event(props){
  return (
    <React.Fragment>
      <div className="gettin-crazy">
        <div className="event-card" onClick = {() => props.whenEventClicked(props.id)}>
          <div className="event-card-content">
            <h3>Date: {props.date}</h3>
            <h3>Start: {props.startTime}  -  Stop: {props.stopTime}</h3>
            <h3><em>Note</em></h3>
            <h3><em>{props.notes}</em></h3>
          </div>
        </div>
      </div>      
      <hr/>
    </React.Fragment>
  );
}

Event.propTypes = {
  date: PropTypes.string,
  startTime: PropTypes.string,
  stopTime: PropTypes.string,
  notes: PropTypes.string,
  id: PropTypes.string,
  whenEventClicked: PropTypes.func
};

export default Event;