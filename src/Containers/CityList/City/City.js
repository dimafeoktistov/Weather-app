import React from "react";
import "./City.scss";

const City = ({
  name,
  temp,
  humidity,
  weather,
  id,
  pressure,
  windSpeed,
  handleCityDelete,
  handleEditStart
}) => {
  return (
    <li className="city__entry">
      <div className="city__entry__heading">
        <h3>{name}</h3>
        <div className="city__entry__controls">
          <button
            className="city__deleteBtn"
            id={id}
            onClick={handleCityDelete}
          >
            X
          </button>
          <button className="city__editBtn" id={id} onClick={handleEditStart}>
            редактировать
          </button>
        </div>
      </div>

      <p>
        Температура: {temp} C; Влажность: {humidity}
        %; Погодные условия - {weather}; Давление - {pressure} мм. ртутного
        столба. Скорость ветра - {windSpeed} м/c.
      </p>
    </li>
  );
};

export default City;
