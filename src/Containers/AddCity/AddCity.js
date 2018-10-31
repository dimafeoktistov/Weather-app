import React, { Component } from "react";
import "./AddCity.scss";
import { connect } from "react-redux";

import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";

import * as actions from "../../Store/actions";

const mapDispatchToProps = dispatch => {
  return {
    cityPostData: (city, token, userId) =>
      dispatch(actions.cityPostData(city, token, userId))
  };
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    isLoading: state.cityIsLoading
  };
};

class AddCity extends Component {
  state = {
    controls: {
      city: {
        elementType: "input",
        elementConfig: {
          placeholder: "Город"
        },
        value: "",
        validation: {
          required: true,
          isEmail: false,
          minLength: 3
        },
        valid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.cityPostData(
      this.state.controls.city.value,
      this.props.token,
      this.props.userId
    );
  };

  handleCityInput = event => {
    this.setState({
      city: event.target.value
    });
  };

  handleCitySubmit = event => {
    event.preventDefault();

    const { token, userId } = this.props;
    console.log(token, userId);

    this.setState({ city: "" });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <form onSubmit={this.submitHandler}>
        {form}
        <Button btnType="Success">ОТПРАВИТЬ</Button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCity);
