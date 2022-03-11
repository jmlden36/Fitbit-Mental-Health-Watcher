import React from 'react';
import NewEventForm from './NewEventForm';
import EventDetail from './EventDetails';
import EditEventForm from './EditEventForm';
import EventList from './EventList';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase'

class WatchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: null,
      error: null,
      isLoaded: false,
      watchInfo: []
    };
  }

  makeApiCall = () => {
    fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json`, {
      method: "GET",
      headers: {"authorization": `${process.env.REACT_APP_API_KEY}`}
    })
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {    
          this.setState({
            isLoaded: true,
            watchInfo: jsonifiedResponse['activities-heart-intraday'].dataset
          });
        })
        .catch((error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }

  componentDidMount() {
    this.makeApiCall()
  }

  handleClick = () => {
    if (this.state.selectedEvent != null) {
      this.setState({
        selectedEvent: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewEventToList = (newEvent) => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleChangingSelectedEvent = (id) => {
    this.props.firestore.get({collection: 'events', doc: id}).then((event) => {
      const firestoreEvent = {
        date: event.get("date"),
        startTime: event.get("startTime"),
        stopTime: event.get("stopTime"),
        notes: event.get("notes"),
        id: event.id
      }
      this.setState({selectedEvent: firestoreEvent });
    });
  }
  handleDeletingEvent = (id) => {
    this.props.firestore.delete({collection: 'events', doc: id});
    this.setState({selectedEvent: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingEventInList =() => {
    this.setState({
      editing: false,
      selectedEvent: null
    })
  }
  render() {
    const auth = this.props.firebase.auth();
    
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access your data.</h1>
          <h1>Don't have an account?  Click on Sign up to create a new account</h1>
        </React.Fragment>
      )
    } 
      if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null;
      if( this.state.editing) {
        currentlyVisibleState = <EditEventForm event = {this.state.selectedEvent} onEditEvent = {this.handleEditingEventInList} />
        buttonText= "Return To List";
      }
      else if (this.state.selectedEvent != null) {
        currentlyVisibleState = 
        <EventDetail 
          watchArr = {this.state.watchInfo}
          event = {this.state.selectedEvent} 
          onClickingDelete = {this.handleDeletingEvent}
          onClickingEdit = {this.handleEditingEventInList} />
        buttonText = "Return to Event List";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewEventForm onNewEventCreation={this.handleAddingNewEventToList} />;
        buttonText = "Return to Event List";
      } else {
        currentlyVisibleState = <EventList eventList={this.props.mainEventList} onEventSelection={this.handleChangingSelectedEvent} />;
        buttonText = "Add Event";
      }
      return (
        <React.Fragment>
          <button className="buttons btn" onClick={this.handleClick}>{buttonText}</button>
          {currentlyVisibleState}
          
        </React.Fragment>
      );
    }
  }
}

WatchInfo.propTypes = {
  mainEventList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    mainEventList: state.mainEventList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

WatchInfo = connect(mapStateToProps)(WatchInfo);

export default withFirestore(WatchInfo);