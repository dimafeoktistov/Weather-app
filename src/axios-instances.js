import axios from "axios";

export const axiosFirebase = axios.create({
  baseURL: "https://weather-app-af1f8.firebaseio.com/"
});

export const axiosOWM = axios.create({
  baseURL: "https://api.openweathermap.org/"
});
