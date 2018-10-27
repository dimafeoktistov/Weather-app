import React, { Component } from "react";
import "./CityList.scss";

import { connect } from "react-redux";
import { cityFetchData } from "../../Actions/citiesActionCreators";

// import City from "./City/City";
import AddCity from "../AddCity/AddCity";

const mapStateToProps = state => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(cityFetchData(url))
  };
};

class CityList extends Component {
  componentDidMount() {
    this.props.fetchData("http://5826ed963900d612000138bd.mockapi.io/items");
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <div>
        <div className="container">
          <div className="cityList__heading">
            <h2>Вы следите за следующими городами</h2>
            <div className="cityList__controls">
              <button>Сортировать</button>
              <AddCity
                handleCityInput={this.props.handleCityInput}
                handleCitySubmit={this.props.handleCitySubmit}
                city={this.props.city}
              />
            </div>
          </div>

          <ul className="cityList cityList__list">
            {this.props.cities.map(city => (
              <li key={city.id}>{city.label}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityList);

// cityName = { city.name }
// temp = { city.main.temp }
// humidity = { city.main.humidity }
// description = { city.weather[0].description }
