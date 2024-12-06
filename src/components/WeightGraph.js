import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';


const WeightGraph = ({ entries }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!entries) return

    // Format data
    const formattedData = entries.map(entry => ({
      date: new Date(entry.date),
      weight: parseFloat(entry.weight),
    }))
    .sort((a, b) => a.date - b.date); // Sort entries by date (ascending order)


    // Set dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 70, left: 70 };

    // Set scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(formattedData, d => d.date)) // Min and max of dates
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData, d => d.weight) + 5]) // Padding above the max weight
      .range([height - margin.bottom, margin.top]);

    // Create SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous renders
    svg
      .attr('width', width)
      .attr('height', height);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y-%m-%d')))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

     // Add line
     svg.append('path')
     .datum(formattedData)
     .attr('fill', 'none')
     .attr('stroke', 'steelblue')
     .attr('stroke-width', 2)
     .attr('d', d3.line()
         .x(d => xScale(d.date))
         .y(d => yScale(d.weight))
     );

    //X-Axis Label
    svg.append('text')
      .attr('x', width / 2) // Center the label horizontally
      .attr('y', height - margin.bottom + 40) // Position below the X-axis
      .attr('text-anchor', 'middle') // Center the text
      .style('font-size', '12px') // Optional: Adjust font size
      .text('Date'); // Label text

    // Add Y-axis label
    svg.append('text')
      .attr('x', -(height / 2))
      .attr('y', margin.left - 50) // Position to the left of the Y-axis
      .attr('transform', 'rotate(-90)') // Rotate the text for vertical orientation
      .attr('text-anchor', 'middle') // Center the text
      .style('font-size', '12px') // Optional: Adjust font size
      .text('Weight (kg)'); // Label text

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
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.weight))
      .attr('r', 4)
      .attr('fill', 'red');

  }, [entries]); // Re-run when entries change

  return <svg ref={svgRef}></svg>;
};

export default WeightGraph;

