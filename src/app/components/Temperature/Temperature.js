import React from 'react';
import PT from 'prop-types';
import 'weathericons/css/weather-icons.css';

import './style.css'

const Temperature = (props) => (
<div>
  {
    props.render === true
      ? ''
      : <div>
          <h1 className="temperature">{props.temp}</h1>
          <i className="wi wi-celsius"></i>
        </div>
  }
</div>
)

Temperature.propTypes = {
  temp: PT.number
}

export default Temperature
