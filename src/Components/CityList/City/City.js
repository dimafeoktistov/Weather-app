import React from "react";
import "./City.scss";

export default function City({ cityName, temp, humidity, description }) {
  return (
    <li className="city__entry">
      <div className="city__entry__heading">
        <h3>{cityName}</h3>
        <div className="city__entry__controls">
          <button className="city__deleteBtn">X</button>
          <button className="city__editBtn">редактировать</button>
        </div>
      </div>

      <p>
        Температура: {temp} C; Влажность: {humidity}
        %; Облачность - {description}.
      </p>
    </li>
  );
}
