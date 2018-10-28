import React, { Component } from "react";
import "./CityList.scss";

import { connect } from "react-redux";
import {
  cityFetchData,
  errorAfterFiveSeconds
} from "../../Actions/citiesActionCreators";

import City from "./City/City";
import AddCity from "../AddCity/AddCity";

class CityList extends Component {
  componentDidMount() {
    this.props.fetchData("cities.json");
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading</p>;
    }

    return (
      <div>
        <div className="container">
          <div className="cityList__heading">
            <h2>Вы следите за следующими городами</h2>
            <div className="cityList__controls">
              <button onClick={this.props.errorAfterFiveSeconds}>
                Сортировать
              </button>
              <AddCity />
            </div>
          </div>

          <ul className="cityList cityList__list">
            {Object.keys(this.props.cities).map(key => {
              const city = this.props.cities[key];

              return <City key={key} name={city.name} id={key} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    hasErrored: state.citiesHasErrored,
    isLoading: state.citiesIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(cityFetchData(url)),
    errorAfterFiveSeconds: () => dispatch(errorAfterFiveSeconds())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityList);

// cityName = { city.name }
// temp = { city.main.temp }
// humidity = { city.main.humidity }
// description = { city.weather[0].description }
