import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";

import IconButton from "../IconButton/IconButton";

import "./MashmateCardStyle.css";

const MashmateCard = (props) => {
  return (
    <Card className="mashmate-card mm-card" key={props.mashmate.mashmateId}>
      <div className="mashmate-body">
        <div className="mashmate-title">
          {props.mashmate.username}
          <IconButton component={<CancelIcon />} />
        </div>
      </div>
    </Card>
  );
};

export default MashmateCard;
