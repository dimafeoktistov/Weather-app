import * as actions from "./actiontypes";
import { axiosFirebase, axiosOWM } from "../axios-instances";
import { APP_ID } from "../constants";

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

export function citiesHasErrored(bool) {
  return {
    type: actions.CITIES_HAS_ERRORED,
    hasErrored: bool
  };
}

export function citiesIsLoading(bool) {
  return {
    type: actions.CITIES_IS_LOADING,
    isLoading: bool
  };
}

export function citiesFetchDataSuccess(cities) {
  return {
    type: actions.CITIES_FETCH_DATA_SUCCESS,
    cities
  };
}

export function citiesFetchData(url) {
  return dispatch => {
    dispatch(citiesIsLoading(true));

    axiosFirebase
      .get(url)
      .then(response => {
        if (response.statusText !== "OK") {
          throw Error(response.statusText);
        }
        dispatch(citiesIsLoading(false));
        dispatch(citiesFetchDataSuccess(response.data));
        if (response.data !== null) {
          Object.keys(response.data).map(key => {
            const cityName = response.data[key].name;
            dispatch(cityFetchData(cityName));
            return cityName;
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(citiesHasErrored(true));
      });
  };
}

export function cityFetchData(cityName) {
  return dispatch => {
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
        dispatch(cityFetchDataSuccess(data));
      })
      .catch(() => {
        dispatch(cityHasErrored(true));
      });
  };
}

export function cityPostData(cityName) {
  return dispatch => {
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
          name: cityName
        };

        postCityToFB(data, dispatch);
        dispatch(cityHasErrored(false));
      })
      .catch(err => {
        dispatch(cityHasErrored(true));
      });
  };
}

export function cityFetchDataSuccess(weatherData) {
  return {
    type: actions.CITY_FETCH_DATA_SUCCESS,
    payload: weatherData
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

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(citiesHasErrored(true));
    }, 5000);
  };
}

export function deleteCityFromFB(id) {
  return dispatch => {
    dispatch(cityIsLoading(true));
    axiosFirebase
      .delete(`/cities/${id}.json`)
      .then(() => {
        dispatch(deleteCity(id));
        dispatch(cityIsLoading(false));
      })
      .catch(() => {
        dispatch(cityHasErrored(true));
      });
  };
}

export function cityPutData(id, city) {
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
        dispatch(cityFetchDataSuccess(weatherData));
        dispatch(editCity(id, city));
        putCityToFB(id, city, dispatch);
        dispatch(cityHasErrored(false));
      })
      .catch(() => {
        dispatch(cityHasErrored(true));
      });
  };
}

function postCityToFB(data, dispatch) {
  axiosFirebase
    .post(`cities.json`, data)
    .then(response => {
      const city = {
        id: response.data.name,
        name: data.name
      };
      dispatch(addCity(city));
    })
    .catch(err => console.log(err));
}

function putCityToFB(id, city, dispatch) {
  axiosFirebase
    .put(`/cities/${id}.json`, city)
    .then(() => {})
    .catch(() => dispatch(cityHasErrored(true)));
}
