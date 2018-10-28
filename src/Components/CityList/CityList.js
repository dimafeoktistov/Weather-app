import React, { Component } from "react";
import "./CityList.scss";

import { connect } from "react-redux";
import {
  cityFetchData,
  errorAfterFiveSeconds,
  deleteCity,
  editCity
} from "../../Actions/citiesActionCreators";

import City from "./City/City";
import AddCity from "../AddCity/AddCity";

class CityList extends Component {
  state = {
    cityNameInput: "",
    id: null,
    isEditing: false
  };

  componentDidMount() {
    this.props.fetchData("cities.json");
  }

  handleCityDelete = e => {
    this.props.deleteCity(e.target.id);
  };

  handleCityChange = e => {
    this.setState({
      ...this.state,
      cityNameInput: e.target.value
    });
  };

  handleEditSubmit = e => {
    e.preventDefault();
    this.props.editCity(this.state.id, this.state.cityNameInput);
    this.setState({
      ...this.state,
      cityNameInput: "",
      isEditing: !this.state.isEditing
    });
  };

  handleEditStart = e => {
    this.setState({
      ...this.state,
      id: e.target.id,
      isEditing: !this.state.isEditing
    });
  };

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading</p>;
    }

    const editingForm = (
      <form onSubmit={this.handleEditSubmit}>
        <label>
          Город:
          <input
            type="text"
            onChange={this.handleCityChange}
            value={this.state.cityNameInput}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

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

              return (
                <City
                  key={key}
                  name={city.name}
                  id={key}
                  handleCityDelete={this.handleCityDelete}
                  handleCityChange={this.handleCityChange}
                  handleEditStart={this.handleEditStart}
                  handleEditSubmit={this.handleEditSubmit}
                  isEditing={this.state.isEditing}
                  cityNameInput={this.state.cityNameInput}
                />
              );
            })}
          </ul>
          {this.state.isEditing && editingForm}
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
    errorAfterFiveSeconds: () => dispatch(errorAfterFiveSeconds()),
    deleteCity: id => dispatch(deleteCity(id)),
    editCity: (id, city) => dispatch(editCity(id, city))
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
