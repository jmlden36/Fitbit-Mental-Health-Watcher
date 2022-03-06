import React from 'react';
import NewEventForm from './NewEventForm';
import EventDetail from './EventDetails';
import EventList from './EventList';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class WatchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
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
          console.log(jsonifiedResponse['activities-heart-intraday'].dataset)
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
        formVisibleOnPage: false,
        selectedEvent: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewEventToList = (newEvent) => {
    const { dispatch } = this.props;
    const { id, startTime, stopTime, notes } = newEvent;
    const action = {
      type: 'ADD_EVENT',
      id: id,
      startTime: startTime,
      stopTime: stopTime,
      notes: notes,
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedEvent = (id) => {
    const selectedEvent = this.props.mainEventList[id];
    this.setState({selectedEvent: selectedEvent});
  }
  
  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.selectedEvent != null) {
      currentlyVisibleState = 
      <EventDetail 
        watchArr = {this.state.watchInfo}
        event = {this.state.selectedEvent} />
      buttonText = "Return to Event List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewEventForm onNewEventCreation={this.handleAddingNewEventToList} />;
      buttonText = "Return to Event List";
    } else {
      currentlyVisibleState = <EventList eventList={this.props.mainEventList} onEventSelection={this.handleChangingSelectedEvent} />;
      buttonText = "Add Event";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
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
  mainEventList: PropTypes.object
}

const mapStateToProps = state => {
  return {
    mainEventList: state
  }
}

WatchInfo = connect(mapStateToProps)(WatchInfo);

export default WatchInfo;