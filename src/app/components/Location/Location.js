import React from 'react';

// CSS
import './style.css';

const LocationContainer = (props) => (
  <div className="location-container">
    <h1 className="location">{props.location}</h1>
  </div>
)
export default LocationContainer
