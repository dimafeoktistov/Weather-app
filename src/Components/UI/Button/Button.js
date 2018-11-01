import React from "react";

import "./Button.scss";

const button = props => (
  <button
    disabled={props.disabled}
    className={`Button ${props.btnType}`}
    onClick={props.clicked}
    id={props.id}
    type={props.type}
  >
    {props.children}
  </button>
);

export default button;
