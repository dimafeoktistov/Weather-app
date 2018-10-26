import React, { Component } from "react";
import "./App.scss";

import CityList from "./Components/CityList/CityList";
import Layout from "./HOCs/Layout/Layout";

class App extends Component {
  render() {
    return (
      <Layout>
        <CityList />
      </Layout>
    );
  }
}

export default App;
