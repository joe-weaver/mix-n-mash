import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";

import "./MashmateCardStyle.css";

const MashmateCard = (props) => {
  return (
    <Card className={"mashmate-card" + (props.index%2 === 0 ? " even" : " odd")} key={props.mashmate.id}>
      <Link to={"/User/" + props.mashmate.id}>
        <div className="mm-link-dark">{props.mashmate.username}</div>
      </Link>
      <IconButton component={<CancelIcon />} onClick={() => props.remove(props.mashmate.id, props.mashmate.username)} />
    </Card>
  );
};

export default MashmateCard;
