import { combineReducers } from "redux";
import { cities, citiesHasErrored, citiesIsLoading } from "./cityReducers";

export default combineReducers({ cities, citiesHasErrored, citiesIsLoading });
