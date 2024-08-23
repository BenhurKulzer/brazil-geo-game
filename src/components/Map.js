// components/Map.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Map = ({ geojson, selectedState, onStateClick, correctStates }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (geojson) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear existing content

      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      const projection = d3.geoMercator().fitSize([width, height], geojson);
      const path = d3.geoPath().projection(projection);

      const features = svg
        .selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', (d) => {
          if (d.properties.id === selectedState) {
            return correctStates.includes(d.properties.id) ? '#4caf50' : '#ff5722'; // Green for correct, orange for incorrect
          }
          return '#ccc'; // Default color
        })
        .attr('stroke', '#333')
        .attr('stroke-width', 0.5)
        .on('click', (event, d) => {
          onStateClick(d.properties.id);
        });

      // Add hover effect
      features
        .on('mouseover', (event, d) => {
          if (d.properties.id !== selectedState) {
            d3.select(event.target).attr('fill', '#ff8a65');
          }
        })
        .on('mouseout', (event, d) => {
          if (d.properties.id !== selectedState) {
            d3.select(event.target).attr('fill', '#ccc');
          }
        });
    }
  }, [geojson, selectedState, onStateClick, correctStates]);

  return <svg ref={svgRef} width="100%" height="500px"></svg>;
};

export default Map;
