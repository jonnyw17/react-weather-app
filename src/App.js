import React, {Component} from 'react';
import './App.css';

// Components
import Input from './app/components/Input/InputLocation';
import Location from './app/components/Location/Location';
import Temperature from './app/components/Temperature/Temperature';
import Condition from './app/components/Condition/Condition';
// import BackgroundImage from ''

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRequestWeather: {},
      userRequestLocation: '',
      userWeather: {},
      userLocation: '',
      removeComponents: false
    }
    this.getWeather = this.getWeather.bind(this);
    this.backgroundImage = this.backgroundImage.bind(this);
  }

  componentWillMount() {
    fetch('http://ip-api.com/json').then(response => {
      return response.json();
    }).then(data => {
      this.setState({userLocation: data.city})
    }).then(() => {
      fetch(`http://api.openweathermap.org/data/2.5/find?q=${this.state.userLocation},uk&units=metric&APPID=47ffea77c9fa76f064142beb0dbd9654`)
      .then(response => {
        return response.json();
      }).then(data => {
        this.setState({
          userWeather: {
            condition: data.list[0].weather[0].main,
            temperature: Math.ceil(data.list[0].main.temp),
            removeComponents: false
          }
        })
      })
    })
  }


  getWeather(inputLocation) {
    fetch(`http://api.openweathermap.org/data/2.5/find?q=${inputLocation},uk&units=metric&APPID=47ffea77c9fa76f064142beb0dbd9654`).then(response => {
      return response.json();
    }).then(data => {
      if (data.count === 0) {
        this.setState({
          userRequestLocation: 'Invalid Location',
          removeComponents: true
        })
      } else {
        this.setState({
          userRequestLocation: inputLocation,
          userRequestWeather: {
            condition: data.list[0].weather[0].main,
            temperature: Math.ceil(data.list[0].main.temp),
            removeComponents: this.state.removeComponents = false
          }
        })
      }
    })
  }

  backgroundImage() {
    let styles;
    if(this.state.userWeather.temperature < 15 || this.state.userRequestWeather.temperature < 15) {
      return styles = {
        backgroundImage: "url('http://vunature.com/wp-content/uploads/2016/11/mountains-minimal-nature-wallpapers-for-iphone-5.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }
    }
  }

  render() {
    return (
      <div className="App" style={this.backgroundImage()}>
        <Location location={
          this.state.userRequestLocation ?
          this.state.userRequestLocation :
          this.state.userLocation}
        />

        <Condition condition={
          this.state.userRequestWeather.condition ?
          this.state.userRequestWeather.condition :
          this.state.userWeather.condition}
          render={this.state.removeComponents}
        />

        <Temperature temp={
          this.state.userRequestWeather.temperature ?
          this.state.userRequestWeather.temperature :
          this.state.userWeather.temperature}
          render={this.state.removeComponents}
        />

        <Input getweather={
          this.getWeather}
        />
      </div>
    );
  }
}

export default App;
