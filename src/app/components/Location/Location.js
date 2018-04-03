import React from 'react';
import PT from 'prop-types'
// CSS
import './style.css';

const LocationContainer = (props) => (<h1 className="location">{props.location}</h1>)

LocationContainer.propTypes = {
  location: PT.string.isRequired
}

export default LocationContainer
