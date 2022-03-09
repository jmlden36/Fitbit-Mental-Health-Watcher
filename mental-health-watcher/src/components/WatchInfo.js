import React from 'react';
import NewEventForm from './NewEventForm';
import EventDetail from './EventDetails';
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
        startTime: event.get("startTime"),
        stopTime: event.get("stopTime"),
        notes: event.get("notes"),
        id: event.id
      }
      this.setState({selectedEvent: firestoreEvent });
    });
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
        </React.Fragment>
      )
    } 
      if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null;
      if (this.state.selectedEvent != null) {
        currentlyVisibleState = 
        <EventDetail 
          watchArr = {this.state.watchInfo}
          event = {this.state.selectedEvent} />
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
          <button onClick={this.handleClick}>{buttonText}</button>
          {currentlyVisibleState}
          
        </React.Fragment>
      );
    }
  }
}
    // function timeRange(objArr, startTime, stopTime) {
    //   let filteredObjArr = objArr.filter(e => parseInt(e.time.replace(":", "")) >= parseInt(startTime.replace(":", "")) && parseInt(e.time.replace(":", "")) <= parseInt(stopTime.replace(":", "")));
    //   return filteredObjArr;
    // }

//     const { error, isLoaded, watchInfo } = this.state;

//     let selectedRates = timeRange(watchInfo, stTime, stpTime);
//     console.log(watchInfo);
//     console.log(selectedRates);
    
//     if (error) {
//       return <React.Fragment>Error: {error.message}</React.Fragment>;
//     } else if (!isLoaded) {
//       return <React.Fragment>Loading...</React.Fragment>;
//     } else {
//       return (
//         <React.Fragment>
//           <h1>WatchInfo</h1>
//             <h2>{Date()}</h2>
//             <input id="start-time" name="start-time" type="time" placeholder='Start' required autoFocus></input>
//             <input id="stop-time" name="stop-time" type="time" placeholder='Stop date (yyyy-mm-dd)' required></input>
            
//                     <ul>
//             {selectedRates.map((element, index) => 
//               <li key={index}>
//                 <h3>{element.time}</h3>
//                 <h3>{element.value}</h3>
//               </li>
//             )}
            
//           </ul>
//         </React.Fragment>
//       );
//     }
//   }
// }
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