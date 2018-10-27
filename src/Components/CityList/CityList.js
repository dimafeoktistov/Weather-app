import React, { Component } from "react";
import "./CityList.scss";

import { connect } from "react-redux";
import {
  cityFetchData,
  errorAfterFiveSeconds
} from "../../Actions/citiesActionCreators";

// import City from "./City/City";
import AddCity from "../AddCity/AddCity";

class CityList extends Component {
  componentDidMount() {
    this.props.fetchData("https://jsonplaceholder.typicode.com/posts");
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    console.log(this.state);

    return (
      <div>
        <div className="container">
          <div className="cityList__heading">
            <h2>Вы следите за следующими городами blalabla</h2>
            <div className="cityList__controls">
              <button onClick={this.props.errorAfterFiveSeconds}>
                Сортировать
              </button>
              <AddCity
                handleCityInput={this.props.handleCityInput}
                handleCitySubmit={this.props.handleCitySubmit}
                city={this.props.city}
              />
            </div>
          </div>

          <ul className="cityList cityList__list" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.city,
    hasErrored: state.cityHasErrored,
    isLoading: state.cityIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(cityFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityList);

// {
//   this.props.city.map(el => (
//     <li key={el.id}>{el.title}</li>
//   ))
// }

// cityName = { city.name }
// temp = { city.main.temp }
// humidity = { city.main.humidity }
// description = { city.weather[0].description }
