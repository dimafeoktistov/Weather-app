import React, { Component } from "react";
import "./App.scss";

import CityList from "./Components/CityList/CityList";
import Layout from "./HOCs/Layout/Layout";

const APPID = "fadad01a2acea22e75c4f8700642a258";

class App extends Component {
  state = {
    query: "",
    cities: []
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
      query: event.target.value
    });
  };

  handleCitySubmit = event => {
    let city = this.state.query;

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}&lang=ru&units=metric`
    )
      .then(res => res.json())
      .then(city =>
        this.setState(prevState => ({
          query: "",
          cities: [...prevState.cities, city]
        }))
      );

    event.preventDefault();
  };

  render() {
    console.log(this.state);
    return (
      <Layout>
        <CityList
          handleCityInput={this.handleCityInput}
          handleCitySubmit={this.handleCitySubmit}
          city={this.state.query}
          cities={this.state.cities}
        />
      </Layout>
    );
  }
}

export default App;
