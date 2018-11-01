import React, { Component } from "react";
import "./App.scss";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CityList from "./Containers/CityList/CityList";
import Layout from "./HOCs/Layout/Layout";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
import * as actions from "./Store/actions/index";

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/citylist" component={CityList} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={CityList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
