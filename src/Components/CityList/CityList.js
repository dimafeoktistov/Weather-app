import React, { Component } from "react";
import "./CityList.scss";

import { axiosFirebase } from "../../axios-instances";

import { connect } from "react-redux";
import {
  citiesFetchData,
  cityFetchDataSuccess,
  deleteCityFromFB,
  cityPutData
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
    this.props.deleteCityFromFB(e.target.id);
  };

  handleCityChange = e => {
    this.setState({
      ...this.state,
      cityNameInput: e.target.value
    });
  };

  handleEditSubmit = e => {
    e.preventDefault();

    const city = {
      name: this.state.cityNameInput
    };

    this.props.cityPutData(this.state.id, city);

    this.setState(prevState => {
      return {
        ...prevState,
        cityNameInput: "",
        isEditing: !prevState.isEditing
      };
    });
  };

  handleEditStart = e => {
    const id = e.target.id;
    this.setState(prevState => {
      return {
        ...prevState,
        id,
        isEditing: !prevState.isEditing
      };
    });
  };

  render() {
    const loader = <p>Загрузка данных</p>;
    const errorMessage = <p> При запросе к серверу произошла ошибка. </p>;
    let citiesList;

    if (
      this.props.cities === null ||
      (Object.keys(this.props.cities).length === 0 &&
        this.props.cities.constructor === Object)
    ) {
      citiesList = <p>Вы не добавили ни одного города</p>;
    } else {
      citiesList = (
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
      );
    }

    if (this.props.citiesHasErrored) {
      return errorMessage;
    }

    if (this.props.citiesIsLoading) {
      return loader;
    }

    const editingForm = (
      <form onSubmit={this.handleEditSubmit}>
        <label>
          Город:
          <input
            required
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
              <button>Сортировать</button>
              <AddCity />
            </div>
          </div>

          {citiesList}

          {this.props.cityIsLoading && loader}
          {this.props.cityHasErrored && errorMessage}
          {this.state.isEditing && editingForm}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    citiesHasErrored: state.citiesHasErrored,
    citiesIsLoading: state.citiesIsLoading,
    cityHasErrored: state.cityHasErrored,
    cityIsLoading: state.cityIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cityFetchDataSuccess: () => dispatch(cityFetchDataSuccess()),
    fetchData: url => dispatch(citiesFetchData(url)),
    deleteCityFromFB: id => dispatch(deleteCityFromFB(id)),
    cityPutData: (id, city) => dispatch(cityPutData(id, city))
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
