import React, {Component} from 'react';
import PT from 'prop-types';

// CSS
import './style.css';

class Input extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    let text = event.target[0].value.split('');
    let location = text.map((val, index) => {
      if (index === 0) {
        return val.toUpperCase()
      } else {
        return val.toLowerCase();
      }
    })
    this.props.getweather(location.join(''))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="weather-input" placeholder="Location"/>
      </form>
    )
  }

  static propTypes = {
    getweather: PT.func.isRequired
  }

}
export default Input
