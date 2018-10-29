import React from "react";
import "./Layout.scss";
import Header from "../../Components/Header/Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />

      <main className="Content">{children}</main>
    </React.Fragment>
  );
};

export default Layout;
