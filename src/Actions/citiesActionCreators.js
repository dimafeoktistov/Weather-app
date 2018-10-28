import * as actions from "./actiontypes";

export function addCity(city) {
  console.log("dispatched");
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

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(citiesIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(cities => dispatch(citiesFetchDataSuccess(cities)))
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
