import * as actions from "../Actions/actiontypes";

export function cityHasErrored(state = false, action) {
  switch (action.type) {
    case actions.CITY_HAS_ERRORED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function cityIsLoading(state = false, action) {
  switch (action.type) {
    case actions.CITY_IS_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function city(state = {}, action) {
  switch (action.type) {
    case actions.CITY_FETCH_DATA_SUCCESS:
      return action.city;

    default:
      return state;
  }
}
