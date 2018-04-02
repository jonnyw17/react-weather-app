import React, {Component} from 'react';
import './App.css';

// Components
import Input from './app/components/Input/InputLocation';
import Location from './app/components/Location/Location';
import Temperature from './app/components/Temperature/Temperature';
import Condition from './app/components/Condition/Condition';
import WeatherImage from './app/components/WeatherImage/WeatherImage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRequestWeather: {},
      userRequestLocation: '',
      userWeather: {},
      userCity: '',
      userCountryCode: '',
      removeComponents: false,
      weatherIconId: ''
    }
    this.getWeather = this.getWeather.bind(this);
    this.pageRefresh = this.pageRefresh.bind(this);
  }

  componentWillMount() {
    fetch('http://ip-api.com/json').then(response => {
      return response.json()
    }).then(data => {
      this.setState({
        userCity: data.city,
        userCountryCode: data.countryCode
      })
    }).then(() => {
      fetch(`http://api.openweathermap.org/data/2.5/find?q=${this.state.userCity},${this.state.userCountryCode}&units=metric&APPID=47ffea77c9fa76f064142beb0dbd9654`)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log(data)
        this.setState({
          userWeather: {
            condition: data.list[0].weather[0].main,
            temperature: Math.ceil(data.list[0].main.temp),
            removeComponents: false
          },
          weatherIconId: data.list[0].weather[0].id,
        })
      })
    })
  }

  pageRefresh() {
    window.location.reload()
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
          },
          weatherIconId: data.list[0].weather[0].id,
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Location location={
          this.state.userRequestLocation ?
          this.state.userRequestLocation :
          this.state.userCity}
        />

        <WeatherImage imageCode={
          this.state.weatherIconId}
          render={this.state.removeComponents}
          pageRefresh={this.pageRefresh}
        />

        <Temperature temp={
          this.state.userRequestWeather.temperature ?
          this.state.userRequestWeather.temperature :
          this.state.userWeather.temperature}
          render={this.state.removeComponents}
        />

        <Condition condition={
          this.state.userRequestWeather.condition ?
          this.state.userRequestWeather.condition :
          this.state.userWeather.condition}
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
