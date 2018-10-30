import React, { Component } from "react";
import "./AddCity.scss";
import { connect } from "react-redux";

import { axiosFirebase } from "../../axios-instances";

import { cityPostData } from "../../Actions/citiesActionCreators";

const mapDispatchToProps = dispatch => {
  return { cityPostData: city => dispatch(cityPostData(city)) };
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

    const data = {
      name: this.state.city
    };

    this.props.cityPostData(this.state.city);

    // axiosFirebase
    //   .post(`cities.json`, data)
    //   .then(response => {
    //     const city = {
    //       id: response.data.name,
    //       name: data.name
    //     };
    //     this.props.addCity(city);
    //   })
    //   .catch(err => console.log(err));
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
