import { combineReducers } from "redux";
import {
  cities,
  citiesHasErrored,
  citiesIsLoading,
  cityIsLoading,
  cityHasErrored
} from "./cityReducers";

export default combineReducers({
  cities,
  citiesHasErrored,
  citiesIsLoading,
  cityIsLoading,
  cityHasErrored
});
