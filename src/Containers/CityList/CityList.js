import React, { Component } from "react";
import "./CityList.scss";

// import { axiosFirebase } from "../../axios-instances";

import { connect } from "react-redux";
import * as actions from "../../Store/actions";

import City from "./City/City";
import AddCity from "../AddCity/AddCity";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Button from "../../Components/UI/Button/Button";
import Modal from "../../Components/UI/Modal/Modal";

class CityList extends Component {
  state = {
    cityNameInput: "",
    id: null,
    isEditing: false,
    sort: true
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
      name: this.state.cityNameInput,
      userId: this.props.userId
    };

    this.props.cityPutData(
      this.state.id,
      city,
      this.props.token,
      this.props.userId
    );

    if (this.props.cityHasErrored) {
      this.setState(prevState => {
        return {
          ...prevState,
          cityNameInput: "",
          isEditing: !prevState.isEditing
        };
      });
    }
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

  cancelEditing = () => {
    this.setState({
      ...this.state,
      isEditing: false
    });
  };

  handleSort = () => {
    this.props.sortCitiesByTemp(this.state.sort);
    this.setState(prevState => {
      return {
        ...prevState,
        sort: !prevState.sort
      };
    });
  };

  render() {
    const errorMessage = <p> Город не найден. </p>;
    const citiesErrorMessage = <p> Не удалось получить данные с сервера. </p>;
    let citiesList;

    if (
      this.props.cities === null ||
      (Object.keys(this.props.cities).length === 0 &&
        this.props.cities.constructor === Object)
    ) {
      citiesList = (
        <p className="cityList__none">Вы не добавили ни одного города</p>
      );
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
      return citiesErrorMessage;
    }

    if (this.props.citiesIsLoading) {
      return <Spinner />;
    }

    if (this.props.cityIsLoading) {
      return <Spinner />;
    }

    const editingForm = (
      <form onSubmit={this.handleEditSubmit}>
        <label className="Label">
          Введите название города на который вы хотите изменить:
          <input
            required
            placeholder="Город"
            type="text"
            onChange={this.handleCityChange}
            value={this.state.cityNameInput}
            className="Input"
          />
        </label>
        <Button btnType="Success" type="submit">
          ИЗМЕНИТЬ ГОРОД
        </Button>
        <Button btnType="Danger" clicked={this.cancelEditing}>
          ОТМЕНИТЬ
        </Button>
      </form>
    );

    return (
      <React.Fragment>
        <div className="container">
          <h2>Вы следите за следующими городами:</h2>
          <div className="cityList__container">
            <div className="cityList__controls">
              <Button clicked={this.handleSort} btnType="Danger sortBtn">
                СОРТИРОВАТЬ
              </Button>

              <AddCity />
            </div>
            {citiesList}
          </div>
        </div>

        <Modal show={this.state.isEditing} modalClosed={this.cancelEditing}>
          {editingForm}
          {this.props.cityHasErrored && errorMessage}
        </Modal>
      </React.Fragment>
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
      dispatch(actions.cityPutData(id, city, token, userId)),
    sortCitiesByTemp: way => dispatch(actions.sortCitiesByTemp(way))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityList);
