import React, { Component } from "react";
import "./App.scss";

import CityList from "./Components/CityList/CityList";
import Layout from "./HOCs/Layout/Layout";

// const APPID = "fadad01a2acea22e75c4f8700642a258";

class App extends Component {
  state = {
    city: "",
    cities: [],
    weather: []
  };

  componentDidMount = () => {
    // fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?q=Tomsk&APPID=${APPID}&lang=ru&units=metric`
    // )
    //   .then(res => res.json())
    //   .then(weather => console.log(weather));
  };

  handleCityInput = event => {
    this.setState({
      ...this.state,
      city: event.target.value
    });
  };

  handleCitySubmit = event => {
    let city = this.state.city;
    this.setState({ ...this.state, city: "", cities: [].concat(city) });
    console.log(this.state);
    event.preventDefault();
  };

  render() {
    return (
      <Layout>
        <CityList
          handleCityInput={this.handleCityInput}
          handleCitySubmit={this.handleCitySubmit}
          city={this.state.city}
        />
      </Layout>
    );
  }
}

export default App;
