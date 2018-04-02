import React from 'react';

// CSS
import './style.css';

const Condition = (props) => (
  <div>
   { props.render === true
        ? <p className="error-warning">Please enter a valid UK city</p>
        : <p className="condition">{props.condition}</p>
   }
  </div>
)
export default Condition
