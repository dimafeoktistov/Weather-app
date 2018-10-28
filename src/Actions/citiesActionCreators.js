import * as actions from "./actiontypes";
import axiosFirebase from "../axios-firebase";

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
    id: city,
    payload: { name: city }
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

export function cityFetchData(url) {
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
      })
      .catch(() => dispatch(citiesHasErrored(true)));
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
