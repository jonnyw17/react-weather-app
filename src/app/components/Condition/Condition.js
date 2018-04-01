import React from 'react';

// CSS
import './style.css';

const Condition = (props) => (
  <div>
   { props.render === true ? '-' : <p className="condtion">{props.condition}</p>}
  </div>
)
export default Condition
