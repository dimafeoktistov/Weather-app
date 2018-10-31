import * as actions from "./actiontypes";
import { axiosFirebase } from "../../axios-instances";
import { cityFetchData } from "./city";

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
        dispatch(citiesFetchDataSuccess(response.data));
        if (response.data !== null) {
          Object.keys(response.data).map(key => {
            const cityName = response.data[key].name;
            dispatch(cityFetchData(cityName, key));
            return cityName;
          });
        }
        dispatch(citiesIsLoading(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(citiesHasErrored(true));
      });
  };
}