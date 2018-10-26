import React from "react";
import "./City.scss";

export default function City() {
  return (
    <li className="city__entry">
      <div className="city__entry__heading">
        <h3>Название города</h3>
        <div className="city__entry__controls">
          <button className="city__deleteBtn">X</button>
          <button className="city__editBtn">редактировать</button>
        </div>
      </div>

      <p>20 C</p>
      <p>15 C</p>
    </li>
  );
}
