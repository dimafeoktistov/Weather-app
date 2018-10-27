import * as actions from "./actiontypes";

export function cityHasErrored(bool) {
  return {
    type: actions.CITY_HAS_ERRORED,
    hasErrored: bool
  };
}

export function cityIsLoading(bool) {
  return {
    type: actions.CITY_IS_LOADING,
    isLoading: bool
  };
}

export function cityFetchDataSuccess(cityData) {
  return {
    type: actions.CITY_FETCH_DATA_SUCCESS,
    cityData
  };
}

export function cityFetchData(url) {
  return dispatch => {
    dispatch(cityIsLoading(true));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(cityIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(cityData => dispatch(cityFetchDataSuccess(cityData)))
      .catch(() => dispatch(cityHasErrored(true)));
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(cityHasErrored(true));
    }, 5000);
  };
}
