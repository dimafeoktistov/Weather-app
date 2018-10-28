import React from "react";
import "./City.scss";
import { connect } from "react-redux";
import { deleteCity } from "../../../Actions/citiesActionCreators";

const City = ({ name, temp, humidity, description, id, deleteCity }) => {
  return (
    <li className="city__entry">
      <div className="city__entry__heading">
        <h3>{name}</h3>
        <div className="city__entry__controls">
          <button
            className="city__deleteBtn"
            id={id}
            onClick={id => deleteCity(id)}
          >
            X
          </button>
          <button className="city__editBtn" id={id}>
            редактировать
          </button>
        </div>
      </div>

      <p>
        Температура: {temp} C; Влажность: {humidity}
        %; Облачность - {description}.
      </p>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCity: id => dispatch(deleteCity(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(City);
