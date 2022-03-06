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

  

  
  
  render() {

    function timeRange(objArr) {
      let filteredObjArr = objArr.filter(e => parseInt(e.time.replace(":", "")) >= parseInt("02:54:29".replace(":", "")) && parseInt(e.time.replace(":", "")) <= parseInt("05:54:29".replace(":", "")));
      return filteredObjArr;
    }

    const { error, isLoaded, watchInfo } = this.state;

    let selectedRates = timeRange(watchInfo);
    console.log(watchInfo);
    console.log(selectedRates);

    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (!isLoaded) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>WatchInfo</h1>
          {/* <form name='timeRange'>
            <input name="start-time" type="time" placeholder='Start' required autoFocus></input>
            <input name="stop-time" type="time" placeholder='Stop date (yyyy-mm-dd)' required autoFocus></input>
            <button type='submit'>submit</button>
          </form> */}
                    <ul>
            {selectedRates.map((element, index) => 
              <li key={index}>
                <h3>{element.time}</h3>
                <h3>{element.value}</h3>
              </li>
            )}
            
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default WatchInfo;