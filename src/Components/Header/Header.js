import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

function Header(props) {
  let navigationLinks = null;

  if (props.isAuthenticated) {
    navigationLinks = (
      <div className="navigationLinks">
        <Link to="/logout">Выйти</Link>
      </div>
    );
  }

  return (
    <header className="App-header">
      <div className="header header__content">
        <h1>Прогноз погоды</h1>
        {navigationLinks}
      </div>
    </header>
  );
}

export default connect(mapStateToProps)(Header);
