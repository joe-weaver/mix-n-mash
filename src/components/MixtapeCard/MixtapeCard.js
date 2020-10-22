import React from "react";
import { Card } from "react-bootstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";

import IconButton from "../IconButton/IconButton";

import "./MixtapeCardStyle.css";

const MixtapeCard = (props) => {
  return (
    <Link to={"MyMixtapes/" + props.mixtape._id}>
      <Card className="mixtape-card" key={props.mixtape._id}>
        <div className="mixtape-card-image"></div>

        <div className="mixtape-card-body">
          <div>{props.mixtape.title}</div>
          <div>{props.mixtape.owner.username}</div>
          <div>{props.mixtape.description}</div>
        </div>

        <div className="mixtape-card-delete">
          <div>
            <IconButton component={<HighlightOffIcon />} />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MixtapeCard;
