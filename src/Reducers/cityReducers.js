import * as actions from "../Actions/actiontypes";

const removeProperty = (obj, property) => {
  return Object.keys(obj).reduce((object, key) => {
    if (key !== property) {
      object[key] = obj[key];
    }
    return object;
  }, {});
};

export function citiesHasErrored(state = false, action) {
  switch (action.type) {
    case actions.CITIES_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };

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
      return {
        ...state,
        [action.id]: action.payload
      };

    case actions.DELETE_CITY:
      console.log(action.id);
      return state;

    default:
      return state;
  }
}

// export function city(state = { id: 0, name: null }, action) {
//   switch (action.type) {
//     case actions.ADD_CITY:
//       return action.city;

//     default:
//       return state;
//   }
// }
