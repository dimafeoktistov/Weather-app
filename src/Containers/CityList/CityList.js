import React, { Component } from "react";
import "./CityList.scss";

// import { axiosFirebase } from "../../axios-instances";

import { connect } from "react-redux";
import * as actions from "../../Store/actions";

import City from "./City/City";
import AddCity from "../AddCity/AddCity";
import Spinner from "../../Components/UI/Spinner/Spinner";

class CityList extends Component {
  state = {
    cityNameInput: "",
    id: null,
    isEditing: false,
    opt: null
  };

  componentDidMount() {
    const { token, userId } = this.props;
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    this.props.fetchData("cities.json" + queryParams, userId);
  }

  handleCityDelete = e => {
    this.props.deleteCityFromFB(e.target.id, this.props.token);
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

    this.props.cityPutData(
      this.state.id,
      city,
      this.props.token,
      this.props.userId
    );

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
                temp={city.temp}
                humidity={city.humidity}
                pressure={city.pressure}
                windSpeed={city.windSpeed}
                weather={city.weather}
                id={key}
                handleCityDelete={this.handleCityDelete}
                handleCityChange={this.handleCityChange}
                handleEditStart={this.handleEditStart}
                handleEditSubmit={this.handleEditSubmit}
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
      return <Spinner />;
    }

    if (this.props.cityIsLoading) {
      return <Spinner />;
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
    cityIsLoading: state.cityIsLoading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cityFetchDataSuccess: () => dispatch(actions.cityFetchDataSuccess()),
    fetchData: (url, userId) => dispatch(actions.citiesFetchData(url, userId)),
    deleteCityFromFB: (id, token) =>
      dispatch(actions.deleteCityFromFB(id, token)),
    cityPutData: (id, city, token, userId) =>
      dispatch(actions.cityPutData(id, city, token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityList);
