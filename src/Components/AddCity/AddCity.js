import React from "react";
import "./AddCity.scss";

export default function AddCity({ handleCityInput, handleCitySubmit, city }) {
  return (
    <form onSubmit={handleCitySubmit}>
      <label>
        Name:
        <input type="text" onChange={handleCityInput} value={city} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
