import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";

import "./MashmateCardStyle.css";

const MashmateCard = (props) => {
  return (
    <Card className="mashmate-card mm-card" key={props.mashmate.id}>
      <div className="mashmate-body">
        <div className="mashmate-title">

        <Link to={"/User/" + props.mashmate.id}>
          <div className="mixtape-result-user mm-link-dark">{props.mashmate.username}</div>
        </Link>
          <IconButton component={<CancelIcon />} />
        </div>
      </div>
    </Card>
  );
};

export default MashmateCard;
