import * as actions from "./actiontypes";
import { citiesIsLoading } from "./cities";
import { axiosFirebase, axiosOWM } from "../../axios-instances";
import { APP_ID } from "../../constants";

export function editCity(id, city) {
  return {
    type: actions.EDIT_CITY,
    id,
    payload: city
  };
}

export function deleteCity(id) {
  return {
    type: actions.DELETE_CITY,
    id: id
  };
}

export function addCity(city) {
  return {
    type: actions.ADD_CITY,
    id: city.id,
    payload: { name: city.name }
  };
}

export function cityFetchDataSuccess(weatherData, key) {
  return {
    type: actions.CITY_FETCH_DATA_SUCCESS,
    payload: weatherData,
    key: key
  };
}

export function cityHasErrored(bool) {
  return {
    type: actions.CITY_HAS_ERRORED,
    cityHasErrored: bool
  };
}

export function cityIsLoading(bool) {
  return {
    type: actions.CITY_IS_LOADING,
    cityIsLoading: bool
  };
}

export function deleteCityFromFB(id, token) {
  return dispatch => {
    dispatch(cityIsLoading(true));
    axiosFirebase
      .delete(`/cities/${id}.json?auth=${token}`)
      .then(() => {
        dispatch(deleteCity(id));
        dispatch(cityIsLoading(false));
      })
      .catch(() => {
        dispatch(cityHasErrored(true));
      });
  };
}

export function cityPostData(cityName, token, userId) {
  return dispatch => {
    let userToken = token;
    let postingUserId = userId;

    axiosOWM
      .get(`?q=${cityName}&APPID=${APP_ID}&lang=ru&units=metric`)
      .then(response => {
        const { coord, main, wind, weather } = response.data;
        const weatherData = {
          coordinates: coord,
          temp: main.temp,
          humidity: main.humidity,
          pressure: (main.pressure / 1.333).toFixed(0),
          windSpeed: wind.speed,
          weather: weather[0].description
        };
        dispatch(cityFetchDataSuccess(weatherData));

        const data = {
          name: cityName,
          userId: postingUserId
        };

        console.log(postingUserId, userToken);

        postCityToFB(data, userToken, dispatch);
        dispatch(cityHasErrored(false));
      })
      .catch(() => {
        dispatch(cityHasErrored(true));
      });
  };
}

export function cityPutData(id, city, token) {
  return dispatch => {
    axiosOWM
      .get(`?q=${city.name}&APPID=${APP_ID}&lang=ru&units=metric`)
      .then(response => {
        const { coord, main, wind, weather } = response.data;
        const weatherData = {
          coordinates: coord,
          temp: main.temp,
          humidity: main.humidity,
          pressure: (main.pressure / 1.333).toFixed(0),
          windSpeed: wind.speed,
          weather: weather[0].description
        };
        dispatch(editCity(id, city));
        dispatch(cityFetchDataSuccess(weatherData, id));
        putCityToFB(id, city, dispatch, token);
        dispatch(cityHasErrored(false));
      })
      .catch(() => {
        dispatch(cityHasErrored(true));
      });
  };
}

export function cityFetchData(cityName, key) {
  return dispatch => {
    dispatch(cityIsLoading(true));
    axiosOWM
      .get(`?q=${cityName}&APPID=${APP_ID}&lang=ru&units=metric`)
      .then(response => {
        const { coord, main, wind, weather } = response.data;
        const data = {
          coordinates: coord,
          temp: main.temp,
          humidity: main.humidity,
          pressure: (main.pressure / 1.333).toFixed(0),
          windSpeed: wind.speed,
          weather: weather[0].description
        };
        dispatch(cityFetchDataSuccess(data, key));
        dispatch(cityIsLoading(false));
      })
      .catch(() => {
        dispatch(cityHasErrored(true));
      });
  };
}

function postCityToFB(data, token, dispatch) {
  axiosFirebase
    .post(`cities.json?auth=${token}`, data)
    .then(response => {
      const city = {
        id: response.data.name,
        name: data.name
      };
      dispatch(addCity(city));
    })
    .catch(err => console.log(err));
}

function putCityToFB(id, city, dispatch, token) {
  axiosFirebase
    .put(`/cities/${id}.json?auth=${token}`, city)
    .then(() => {})
    .catch(() => dispatch(cityHasErrored(true)));
}
