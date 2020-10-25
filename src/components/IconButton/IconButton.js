import React from "react";
import { Button } from "react-bootstrap";

import "./IconButtonStyle.css";

const IconButton = (props) => {
  return (
    <Button
      variant="outline-secondary"
      className="icon-button"
      onClick={props.callback || props.onClick}
    >
      {props.component}
    </Button>
  );
};

export default IconButton;
