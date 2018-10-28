import * as actions from "../Actions/actiontypes";

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
      console.log("fetch");
      return action.cities;

    case actions.ADD_CITY:
      console.log("cities reducer");
      return {
        ...state,
        [action.id]: action.payload
      };

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
