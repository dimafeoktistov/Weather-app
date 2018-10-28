import React, { Component } from "react";
import "./AddCity.scss";
import { connect } from "react-redux";

import { addCity } from "../../Actions/citiesActionCreators";

const mapDispatchToProps = dispatch => {
  return {
    addCity: city => {
      dispatch(addCity(city));
    }
  };
};

class AddCity extends Component {
  state = {
    city: ""
  };

  handleCityInput = event => {
    this.setState({
      city: event.target.value
    });
  };

  handleCitySubmit = event => {
    event.preventDefault();
    this.props.addCity(this.state.city);
    this.setState({ city: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleCitySubmit}>
        <label>
          Город:
          <input
            type="text"
            onChange={this.handleCityInput}
            value={this.state.city}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddCity);
