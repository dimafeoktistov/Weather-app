import React from "react";
import "./CityList.scss";

import City from "./City/City";
import AddCity from "../AddCity/AddCity";

export default function CityList({ cityTitle, cityWeather }) {
  return (
    <div className="container">
      <div className="cityList__heading">
        <h2>Вы следите за следующими городами</h2>
        <div className="cityList__controls">
          <button>Сортировать</button>
          <AddCity />
        </div>
      </div>

      <ul className="cityList cityList__list">
        <City />
        <City />
      </ul>
    </div>
  );
}
