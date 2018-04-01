import React from 'react';

import './style.css'

const Temperature = (props) => (
<div>
  {
    props.render === true
      ? '-'
      : <div>
          <h1 className="temperature">{props.temp}</h1>
          <i className="far fa-circle"></i>
        </div>
  }
</div>
)
export default Temperature
