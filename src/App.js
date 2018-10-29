import React, { Component } from "react";
import "./App.scss";

import CityList from "./Components/CityList/CityList";
import Layout from "./HOCs/Layout/Layout";

class App extends Component {
  // state = {
  //   query: "",
  //   cities: []
  // };

  componentDidMount = () => {
    // fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?q=Tomsk&APPID=${APPID}&lang=ru&units=metric`
    // )
    //   .then(res => res.json())
    //   .then(weather => console.log(weather));
  };

  // handleCityInput = event => {
  //   this.setState({
  //     ...this.state,
  //     query: event.target.value
  //   });
  // };

  handleCitySubmit = event => {
    // let city = this.state.query;
    // console.log(city);

    // fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}&lang=ru&units=metric`
    // )
    //   .then(res => res.json())
    //   .then(city =>
    //     this.setState(prevState => ({
    //       query: "",
    //       cities: [...prevState.cities, city]
    //     }))
    //   );

    event.preventDefault();
  };

  render() {
    return (
      <Layout>
        <CityList />
      </Layout>
    );
  }
}

export default App;

// handleCityInput = { this.handleCityInput }
// handleCitySubmit = { this.handleCitySubmit }
// city = { this.state.query }
// cities = { this.state.cities }
