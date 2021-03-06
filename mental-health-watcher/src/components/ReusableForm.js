import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='date'
          name='date' 
          required />
        <input
          type='time'
          name='startTime' 
          required />
        <input
          type='time'
          name='stopTime' 
          required />
        <textarea
          name='notes'
          placeholder='Tell me about this event?.' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;