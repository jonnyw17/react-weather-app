import React from 'react';
import PT from 'prop-types';

import 'weathericons/css/weather-icons.css';

// CSS
import './style.css';

const WeatherImage = (props) => (
  <div>
  {
    props.render === true
      ? <button className="refresh-btn" onClick={props.pageRefresh} type="submit">
          <i className="refresh-icon wi wi-refresh"></i>
        </button>
      : <i className={`weather-icon wi wi-owm-${props.imageCode}`}></i>
  }

  </div>
)

WeatherImage.propTypes = {
  pageRefresh: PT.func.isRequired,
  imageCode: PT.string
}

export default WeatherImage;
