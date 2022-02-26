import React from 'react';

class Headlines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      watchInfo: {}
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
          console.log(jsonifiedResponse)
          this.setState({
            isLoaded: true,
            watchInfo: jsonifiedResponse
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
    const { error, isLoaded, watchInfo } = this.state;
    let first = watchInfo['activities-heart-intraday'].dataset[0].time;
    console.log(first);
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
                <h3>hi</h3>
              
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Headlines;
