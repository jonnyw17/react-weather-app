import React from 'react';
import PT from 'prop-types';

// CSS
import './style.css';

const Condition = (props) => (
  <div className="condition">
   { props.render === true
        ? <p className="error-warning">Please enter a valid UK city</p>
        : <p className="condition">{props.condition}</p>
   }
  </div>
)

Condition.propTypes = {
  condition: PT.string
}

export default Condition
