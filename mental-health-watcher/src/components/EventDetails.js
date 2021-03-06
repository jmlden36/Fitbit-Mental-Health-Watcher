import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import WatchInfo from "./WatchInfo";
import * as d3 from 'd3';

function EventDetail(props) {
  const { eventHR, watchArr, onClickingDelete } = props;
  
  function timeRange(objArr, stTime, stpTime) {
      let filteredObjArr = objArr.filter(e => parseInt(e.time.replace(":", "")) >= parseInt(stTime.toString().replace(":", "")) && parseInt(e.time.replace(":", "")) <= parseInt(stpTime.toString().replace(":", "")));
      return filteredObjArr;
    }

    let selectedRates = timeRange(watchArr, eventHR.startTime+":00", eventHR.stopTime+":00");

    //variables for the line chart

    let valArr = selectedRates.map(function(e) {
      return e["value"];
    });
    //x axis 

    const [data] = useState(valArr)
    const svgRef = useRef();
    
    useEffect(() => {
      // setting up svg
      const w = 800;
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
          .attr('stroke', 'red')
    }, [data]);
  return (
    <React.Fragment>
      <button className="buttons" onClick={() => onClickingDelete(eventHR.id) }>Delete Event</button>
      <button className="buttons" onClick={ props.onClickingEdit }>Update</button>
      <div className="detail">
        <h1>Event Detail</h1>
      </div>
      <div className="date">
      <h3>{eventHR.date}</h3>
      </div>
      <div className="event">
      <h3>From: {eventHR.startTime} To: {eventHR.stopTime}</h3>
      </div>
      <div className="notes">
        <h3>{eventHR.notes}</h3>
      </div>
      
      
      <div className="lineChart">
        <svg ref={svgRef}></svg>
      </div>
      
      <ul>
        {selectedRates.map((element) => 
              <div className="data-points">
                <pre>
                <h3>Time: {element.time}</h3>
                
                <h3>Heart Rate in BPM {element.value}</h3>
                <h3>____________________</h3>
                </pre>
              </div>
            )}
            
          </ul>
      <hr/>
    </React.Fragment>
  );
}  

EventDetail.propTypes = {
  eventHR: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default EventDetail;