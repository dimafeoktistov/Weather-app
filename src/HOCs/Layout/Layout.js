import React from "react";
import Aux from "../Aux/Aux";
import "./Layout.scss";
import Header from "../../Components/Header/Header";

const Layout = ({ children }) => {
  return (
    <Aux>
      <Header />

      <main className="Content">{children}</main>
    </Aux>
  );
};

export default Layout;
