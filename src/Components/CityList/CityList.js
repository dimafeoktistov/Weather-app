import React, { Component } from "react";
import "./CityList.scss";

import { axiosFirebase } from "../../axios-instances";

import { connect } from "react-redux";
import {
  citiesFetchData,
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
    isEditing: false,
    uiLoading: false,
    uiError: false
  };

  componentDidMount() {
    this.props.fetchData("cities.json");
  }

  handleCityDelete = e => {
    this.setState({
      ...this.state,
      uiLoading: true
    });
    const cityId = e.target.id;
    axiosFirebase
      .delete(`/cities/${e.target.id}.json`)
      .then(response => {
        this.props.deleteCity(cityId);
        this.setState({
          ...this.state,
          uiLoading: false
        });
        console.log(response);
      })
      .catch(err => {
        this.setState({
          ...this.state,
          uiError: true
        });
      });
  };

  handleCityChange = e => {
    this.setState({
      ...this.state,
      cityNameInput: e.target.value
    });
  };

  handleEditSubmit = e => {
    e.preventDefault();
    this.setState({ ...this.state, uiLoading: true });

    //посылаем запрос к базе на изменение данных
    const data = { name: this.state.cityNameInput };
    const city = data;
    axiosFirebase
      .put(`/cities/${this.state.id}.json`, data)
      .then(res => {
        this.setState({ ...this.state, uiLoading: false });
        this.props.editCity(this.state.id, city);
        console.log(res);
      })
      .catch(err => console.log(err));

    // отправка действия в редакс для изменения города

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

    if (this.props.hasErrored) {
      return errorMessage;
    }

    if (this.props.isLoading) {
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
              <button onClick={this.props.errorAfterFiveSeconds}>
                Сортировать
              </button>
              <AddCity />
            </div>
          </div>

          {citiesList}

          {this.state.uiLoading && loader}
          {this.state.uiError && errorMessage}
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
    fetchData: url => dispatch(citiesFetchData(url)),
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
