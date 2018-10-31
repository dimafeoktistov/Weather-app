import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="App-header">
      <h1>Прогноз погоды</h1>
      <Link to="/logout">Выйти</Link>
    </header>
  );
}
