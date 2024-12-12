import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const StepsGraph = ({ entries }) => {
    //Create reference to the svg DOM element to allow d3 access across multiple renders
    const svgRef = useRef();

    useEffect(() => {
        if (!entries) return

        const formattedData = entries.map(entry => ({
            date: new Date(entry.date),
            steps: entry.steps
        }))
            .sort((a, b) => a.date - b.date); // Sort entries by date (ascending order)

        // Set dimensions
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 70, left: 70 };

        //Calculates average steps 
        const averageSteps = formattedData.reduce((sum, entry) => sum + entry.steps, 0) / formattedData.length;

        
        /* 
        Set scales
        X scale uses scaleBand for Bar Chart
        */
        const xScale = d3
            .scaleBand()
            .domain(formattedData.map(d => d.date)) // Map dates to categories
            .range([margin.left, width - margin.right])
            .padding(0.2); // Adds padding between bars

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(formattedData, d => d.steps) + 5]) // Padding above the max weight
            .range([height - margin.bottom, margin.top]);

        // Create SVG
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous renders
        svg
            .attr('width', width)
            .attr('height', height);
        // X axis
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat('%Y-%m-%d')))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        svg.append('g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        // Bars
        svg.selectAll("rect")
            //Bind data to the selected rectangle
            .data(formattedData)
            //Creates a new rectangle element
            .enter()
            .append("rect")
            //Defines the x and y cordinates for where the rectangle is drawn given the x and y scales
            .attr('x', d => xScale(d.date))
            .attr('y', d => yScale(d.steps))
            .attr("width", xScale.bandwidth())
            .attr('height', d => height - margin.bottom - yScale(d.steps)) // Bar height
            .attr("fill", "#69b3a2")

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
            .text('Num Of Steps');

        // Add chart title
        svg.append("text")
            .attr("class", "chart-title")
            .attr("x", width / 2)
            .attr("y", margin.top - 7)
            .attr("text-anchor", "middle")
            .text("Graph of Entered Steps");

        // Display the average steps
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - margin.bottom - 20)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(`Average Steps: ${averageSteps.toFixed(2)}`);


    }, [entries]); //dependancy array re runs render whenever entries changes

    return <svg ref={svgRef}></svg>;

};

export default StepsGraph;