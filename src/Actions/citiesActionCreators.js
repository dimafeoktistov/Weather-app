import * as actions from "./actiontypes";
import { axiosFirebase, axiosOWM } from "../axios-instances";
import { APP_ID } from "../constants";

export function editCity(id, city) {
  return {
    type: actions.EDIT_CITY,
    id,
    payload: city
  };
}

export function deleteCity(id) {
  return {
    type: actions.DELETE_CITY,
    id: id
  };
}

export function addCity(city) {
  return {
    type: actions.ADD_CITY,
    id: city.id,
    payload: { name: city.name }
  };
}

export function citiesHasErrored(bool) {
  return {
    type: actions.CITIES_HAS_ERRORED,
    hasErrored: bool
  };
}

export function citiesIsLoading(bool) {
  return {
    type: actions.CITIES_IS_LOADING,
    isLoading: bool
  };
}

export function citiesFetchDataSuccess(cities) {
  return {
    type: actions.CITIES_FETCH_DATA_SUCCESS,
    cities
  };
}

export function citiesFetchData(url) {
  return dispatch => {
    dispatch(citiesIsLoading(true));

    axiosFirebase
      .get(url)
      .then(response => {
        if (response.statusText !== "OK") {
          throw Error(response.statusText);
        }
        dispatch(citiesIsLoading(false));
        dispatch(citiesFetchDataSuccess(response.data));
        if (response.data !== null) {
          Object.keys(response.data).map(key => {
            const cityName = response.data[key].name;
            // dispatch(cityFetchData(cityName));
            return cityName;
          });
        }

        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
        dispatch(citiesHasErrored(true));
      });
  };
}

export function cityFetchData(cityName) {
  return dispatch => {
    console.log(cityName);
    axiosOWM
      .get(
        `data/2.5/weather?q=${cityName}&APPID=${APP_ID}&lang=ru&units=metric`
      )
      .then(response => {
        console.log(response);
      });
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(citiesHasErrored(true));
    }, 5000);
  };
}
