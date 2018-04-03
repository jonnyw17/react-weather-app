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
      weatherIconId: '',
      backgroundColor: ''
    }
    this.getWeather = this.getWeather.bind(this);
    this.pageRefresh = this.pageRefresh.bind(this);
    this.weatherConditionBackgroundColor = this.weatherConditionBackgroundColor.bind(this);
  }

  componentWillMount() {
    fetch('https://api.ipdata.co').then(response => {
      return response.json()
    }).then(data => {
      this.setState({
        userCity: data.city,
        userCountryCode: data.country_code
      })
    }).then(() => {
      fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/find?q=${this.state.userCity},${this.state.userCountryCode}&units=metric&APPID=47ffea77c9fa76f064142beb0dbd9654`)
      .then(response => {
        return response.json();
      }).then(data => {
        this.setState({
          userWeather: {
            condition: data.list[0].weather[0].description,
            temperature: Math.ceil(data.list[0].main.temp),
            removeComponents: false
          },
          weatherIconId: data.list[0].weather[0].id,
        })
        if(this.state.userWeather || this.state.userRequestWeather) {
          this.weatherConditionBackgroundColor()
        }
      })
    })
  }

  pageRefresh() {
    window.location.reload()
  }

  getWeather(inputLocation) {
    fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/find?q=${inputLocation},uk&units=metric&APPID=47ffea77c9fa76f064142beb0dbd9654`).then(response => {
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
            condition: data.list[0].weather[0].description,
            temperature: Math.ceil(data.list[0].main.temp),
            removeComponents: this.state.removeComponents = false
          },
          weatherIconId: data.list[0].weather[0].id,
        })
        if(this.state.userWeather || this.state.userRequestWeather) {
          this.weatherConditionBackgroundColor()
        }
      }
    })
  }

  weatherConditionBackgroundColor() {
  const userTemp = this.state.userWeather.temperature;
  const userRequestTemp = this.state.userRequestWeather.temperature;

  if (userTemp) {
    if ((userTemp < 6) || (userRequestTemp < 6)) {
      this.setState({
        backgroundColor: 'cold' // cold temperature background color
      })
    } else if ((userTemp >= 6 && userTemp < 25) || (userRequestTemp >= 6 && userRequestTemp < 25)) {
      this.setState({
        backgroundColor: 'normal' // normal temperature background color
      })
    } else if ((userTemp > 25) || userRequestTemp > 25) {
      this.setState({
        backgroundColor: 'hot' // hot temperature background color
      })
    }
  }
}

  render() {
    return (
      <div id="test" className={`App ${this.state.backgroundColor}`}>
        <div>
          <Location location={
            this.state.userRequestLocation ?
            this.state.userRequestLocation :
            this.state.userCity}
          />
        </div>
        <div>
          <WeatherImage imageCode={
            this.state.weatherIconId}
            render={this.state.removeComponents}
            pageRefresh={this.pageRefresh}
          />
        </div>
        <div>
          <Condition condition={
            this.state.userRequestWeather.condition ?
            this.state.userRequestWeather.condition :
            this.state.userWeather.condition}
            render={this.state.removeComponents}
          />
        </div>
        <div>
          <Temperature temp={
            this.state.userRequestWeather.temperature ?
            this.state.userRequestWeather.temperature :
            this.state.userWeather.temperature}
            render={this.state.removeComponents}
          />
        </div>
        <div className="input-container">
          <Input getweather={
            this.getWeather}
          />
        </div>
      </div>
    );
  }
}

export default App;
