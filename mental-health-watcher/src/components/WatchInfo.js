import React from 'react';

class WatchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      watchInfo: []
    };
  }
  makeApiCall = () => {
    fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/2022-02-24/2022-02-24.json`, {
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

  

  
  
  render() {

    function timeRange(objArr) {
      let filteredObjArr = objArr.filter(e => parseInt(e.time.replace(":", "")) >= 5 && parseInt(e.time.replace(":", "")) <=7);
      return filteredObjArr;
    }
    const { error, isLoaded, watchInfo } = this.state;
    // let selectedRates = watchInfo.filter(e => parseInt((e.time.replace(":", ""))) >= 5 && parseInt((e.time.replace(":", ""))) <=7)
    let selectedRates = timeRange(watchInfo);
    console.log(watchInfo)
    console.log(selectedRates)
    // const objectArray = watchInfo['activities-heart-intraday'];
    // console.log(watchInfo['activities-heart-intraday'])
    // let first = watchInfo['activities-heart-intraday'];
    // console.log(first);
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (!isLoaded) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>WatchInfo</h1>
          <input name="start-time" type="time" placeholder='Start' required autoFocus></input>
          <input name="stop-time" type="time" placeholder='Stop date (yyyy-mm-dd)' required autoFocus></input>
          <ul>
            {selectedRates.map((element, index) => 
              <li key={index}>
                <h3>{element.time}</h3>
                <h3>{element.value}</h3>
              </li>
            )}
          </ul>
          
          {/* <ul>
                <p>{first.dataset[0].filter((time => parseInt(time[4]) >= 5 && parseInt(time[4]) <= 10))}</p>  
                
              
          </ul> */}
        </React.Fragment>
      );
    }
  }
}

export default WatchInfo;



// let info = response['activities-heart-intraday']['dataset'];
// let infoTime = info[0].time;
// function noColon(string) {
//   let nCStr = string.replace(":", "");
//   return nCStr;
// }
// function timeRange(objArr) {
//   let filteredObjArr = objArr.filter(e => parseInt(noColon(e.time)) >= 5 && parseInt(noColon(e.time)) <=7);
//   return filteredObjArr;
// }