import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';


const WeightGraph = ({ entries }) => {
  //Svg reference object so d3 can reference the DOM element directly
  const svgRef = useRef();
  
  //React UseEffect is used to handle entries changing
  useEffect(() => {
    if (!entries) return

    // Format data
    const formattedData = entries.map(entry => ({
      //String to date format for d3 processing
      date: new Date(entry.date),
      weight: entry.weight,
    }))
    .sort((a, b) => a.date - b.date); // Sort entries by date (ascending order)


    // Set dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 70, left: 70 };

    // Set scales
    const xScale = d3
      //Uses d3 scaletime to define the scaling factor for the graph
      .scaleTime()
      //retrieves dates from entries and establishes the minimum and maximum dates from the array
      .domain(d3.extent(formattedData, d => d.date)) 
      //Allows d3 to map the scales to the range of pixel values on the graphs x axis
      .range([margin.left, width - margin.right]);

    const yScale = d3
    //Uses Scale Linear to construct the scale for the Y-Axis
    //.domain is used to establish the range given the max weight and sets the min to 0
      .scaleLinear()
      .domain([0, d3.max(formattedData, d => d.weight) + 5])
      .range([height - margin.bottom, margin.top]);

    // Creates svg using d3.select on the reference value to the graph DOM element
    //Allows d3 to persist across multiple renders
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // Clear previous renders

    svg
      .attr('width', width)
      .attr('height', height);

    /* 
    Adds group element to svg x axis
    Transforms to the horizontal bottom of the graph
    call function sets sxis bottom to the defined xScale
    Formats/tranforms date 
    */
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y-%m-%d')))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    //Y-Axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.1))

     // Add line
     svg.append('path')
     //Establishes line for entries
     .datum(formattedData)
     .attr('fill', 'none')
     .attr('stroke', 'rgb(	57, 255, 20)')
     .attr('stroke-width', 2)
     //Maps the line to pixels given xy scales
     .attr('d', d3.line()
         .x(d => xScale(d.date))
         .y(d => yScale(d.weight))
     );

    //X-Axis Label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom + 40) 
      .attr('text-anchor', 'middle') 
      .style('font-size', '12px') 
      .text('Date'); 

    // Add Y-axis label
    svg.append('text')
      .attr('x', -(height / 2))
      .attr('y', margin.left - 50) 
      .attr('transform', 'rotate(-90)') 
      .attr('text-anchor', 'middle') 
      .style('font-size', '12px') 
      .text('Weight (kg)'); 

    // Add chart title
    svg.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", margin.top - 7)
      .attr("text-anchor", "middle")
      .text("Graph of Entered Weight's");

    // Add points
    svg.selectAll('circle')
      .data(formattedData)
      .enter()
      .append('circle')
      //Sets x and y co-ordinates for points to be drawn
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.weight))
      //radius
      .attr('r', 4)
      .attr('fill', 'green');

  }, [entries]); // Entries is passed to useEffect function to re-run if entries is changed

  return <svg ref={svgRef}></svg>;
};

export default WeightGraph;

