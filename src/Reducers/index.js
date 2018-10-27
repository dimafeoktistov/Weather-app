import { combineReducers } from "redux";
import { city, cityHasErrored, cityIsLoading } from "./cityReducers";

export default combineReducers(city, cityHasErrored, cityIsLoading);
