import axios from "axios";

const instance = axios.create({
  baseURL: "https://weather-app-af1f8.firebaseio.com/"
});

export default instance;
