import { combineReducers } from "redux";
import {
  cities,
  citiesHasErrored,
  citiesIsLoading,
  cityIsLoading,
  cityHasErrored
} from "./cityReducers";

import authReducer from "./auth";

export default combineReducers({
  cities,
  citiesHasErrored,
  citiesIsLoading,
  cityIsLoading,
  cityHasErrored,
  auth: authReducer
});
