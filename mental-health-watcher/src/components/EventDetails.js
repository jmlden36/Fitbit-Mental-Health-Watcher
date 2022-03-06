import React from "react";
import PropTypes from "prop-types";
import WatchInfo from "./WatchInfo";

function EventDetail(props) {
  const { event, watchArr} = props;
  console.log(watchArr);
  console.log(event.startTime)
  console.log(event.stopTime)
  
  function timeRange(objArr, stTime, stpTime) {
      let filteredObjArr = objArr.filter(e => parseInt(e.time.replace(":", "")) >= parseInt(stTime.toString().replace(":", "")) && parseInt(e.time.replace(":", "")) <= parseInt(stpTime.toString().replace(":", "")));
      return filteredObjArr;
    }

    let selectedRates = timeRange(watchArr, event.startTime+":00", event.stopTime+":00");
    console.log(event.startTime+":00")
    console.log(selectedRates)



  

    

    
    
    
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
  return (
    <React.Fragment>
      <h1>Event Detail</h1>
      <h3>{event.startTime} - {event.stopTime}</h3>
      <p><em>{event.notes}</em></p>
      <ul>
        {selectedRates.map((element, index) => 
              <li key={index}>
                <h3>{element.time}</h3>
                <h3>{element.value}</h3>
              </li>
            )}
            
          </ul>
      <hr/>
    </React.Fragment>
  );
}        

    

EventDetail.propTypes = {
  event: PropTypes.object,
};

export default EventDetail;