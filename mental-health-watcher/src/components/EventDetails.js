import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import WatchInfo from "./WatchInfo";
import * as d3 from 'd3';
function EventDetail(props) {
  const { event, watchArr} = props;
  const [heartData, setHeartData] = useState([]);
  const [heartDataLoading, setHeartDataLoading] = useState(true);

  const fetchDateTimeData = async () => {
    const resp = await fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/2022-03-08/1d/1min.json`, {
    method: "GET",
      headers: {"authorization": `${process.env.REACT_APP_API_KEY}`}
    })
    const data = await resp.json();
    console.log(data['activities-heart-intraday'].dataset);
    setHeartData(data['activities-heart-intraday'].dataset)
    console.log(heartData)
    setHeartDataLoading(false)
    
  };


  useEffect(() => {
    fetchDateTimeData();
  }, [])
  
  function timeRange(objArr, stTime, stpTime) {
      let filteredObjArr = objArr.filter(e => parseInt(e.time.replace(":", "")) >= parseInt(stTime.toString().replace(":", "")) && parseInt(e.time.replace(":", "")) <= parseInt(stpTime.toString().replace(":", "")));
      return filteredObjArr;
    }

    let selectedRates = timeRange(heartData, event.startTime+":00", event.stopTime+":00");
    console.log(selectedRates)

    //variables for the line chart

    let valArr = selectedRates.map(function(e) {
      return e["value"];
    });
    console.log(valArr)
    //x axis 
    // const timeArr = watchArr.map(e => e.time)
    //y axis
    // const valArr = watchArr.map(e => e.value)
    // console.log(valArr)

    const [data] = useState(valArr)
    console.log(data)
    const svgRef = useRef();

    useEffect(() => {
      // setting up svg
      const w = 1200;
      const h = 200;
      const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('margin-top', '50')
        .style('overflow', 'visible')
      // setting the scaling
      const xScale = d3.scaleLinear()
        .domain([0, data.length -1])
        .range([0, w]);
      const yScale = d3.scaleLinear()
        .domain([0, h])
        .range([h, 0])
      const generateScaledLine = d3.line()
        .x((d, i) => xScale(i))
        .y(yScale)
        .curve(d3.curveCardinal);
      // setting the axes
      const xAxis = d3.axisBottom(xScale)
        .ticks(data.length)
        .tickFormat(i => i + 1);
      const yAxis = d3.axisLeft(yScale)
        .ticks(5);
      svg.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`);
      svg.append('g')
        .call(yAxis);
      // setting up the data for the svg
      svg.selectAll('.line')
        .data([data])
        .join('path')
          .attr('d', d => generateScaledLine(d))
          .attr('fill', 'none')
          .attr('stroke', 'black')
    }, [data]);
  return (
    <React.Fragment>
      <h1>Event Detail</h1>
      <h3>{event.startTime} - {event.stopTime}</h3>
      <p><em>{event.notes}</em></p>
      <div className="lineChart">
        <svg ref={svgRef}></svg>
      </div>
      
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