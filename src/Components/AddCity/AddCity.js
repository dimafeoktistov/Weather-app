import React from "react";
import "./AddCity.scss";

export default function AddCity() {
  return (
    <div>
      <input type="text" placeholder="Введите город" />
      <button className="a">Добавить</button>
    </div>
  );
}
