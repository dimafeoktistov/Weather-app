import * as actions from "../actions/actiontypes";

function removeProperty(obj, property) {
  return Object.keys(obj).reduce((object, key) => {
    if (key !== property) {
      object[key] = obj[key];
    }
    return object;
  }, {});
}

export function citiesHasErrored(state = false, action) {
  switch (action.type) {
    case actions.CITIES_HAS_ERRORED:
      return action.hasErrored;

    default:
      return state;
  }
}

export function citiesIsLoading(state = false, action) {
  switch (action.type) {
    case actions.CITIES_IS_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function cities(state = {}, action) {
  switch (action.type) {
    case actions.CITIES_FETCH_DATA_SUCCESS:
      return action.cities;

    case actions.ADD_CITY:
      return { ...state, [action.id]: action.payload };

    case actions.DELETE_CITY:
      return removeProperty(state, action.id);

    case actions.EDIT_CITY:
      return {
        ...state,
        [action.id]: action.payload
      };

    case actions.CITY_FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.key]: {
          ...action.payload
        }
      };

    case actions.SORT_CITIES_BY_TEMP:
      return Object.keys(state)
        .sort((a, b) => {
          if (action.payload) {
            return state[a].temp - state[b].temp;
          } else {
            return state[b].temp - state[a].temp;
          }
        })
        .reduce((o, v) => {
          o[v] = state[v];
          return o;
        }, {});

    default:
      return state;
  }
}

export function city(state, action) {
  switch (action.type) {
    case actions.CITY_FETCH_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

export function cityFetchDataError(state = false, action) {
  switch (action.type) {
    case actions.CITY_FETCH_DATA_ERROR:
      return action.cityIsErrored;

    default:
      return state;
  }
}

export function cityIsLoading(state = false, action) {
  switch (action.type) {
    case actions.CITY_IS_LOADING:
      return action.cityIsLoading;

    default:
      return state;
  }
}

export function cityHasErrored(state = false, action) {
  switch (action.type) {
    case actions.CITY_HAS_ERRORED:
      return action.cityHasErrored;

    default:
      return state;
  }
}
