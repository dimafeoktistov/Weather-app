import React from "react";
import "./City.scss";
import Button from "../../../Components/UI/Button/Button";

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
          <Button
            clicked={handleCityDelete}
            btnType="city__deleteBtn Danger"
            id={id}
          >
            УДАЛИТЬ
          </Button>
          <Button
            clicked={handleEditStart}
            btnType="city__editBtn Success"
            id={id}
          >
            РЕДАКТИРОВАТЬ
          </Button>
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
