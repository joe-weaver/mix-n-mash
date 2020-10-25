import React from "react";
import { Card } from "react-bootstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";

import IconButton from "../IconButton/IconButton";

import "./MixtapeCardStyle.css";

const MixtapeCard = (props) => {
  return (
      <Card className="mixtape-card" key={props.mixtape._id}>
        <div className="mixtape-card-image"></div>

        <div className="mixtape-card-body">
        <Link to={"MyMixtapes/" + props.mixtape._id}>
          <div>{props.mixtape.title}</div>
        </Link>
        <Link to={"User/" + props.mixtape.ownerId}>
          <div>{props.mixtape.owner.username}</div>
        </Link>
          <div>{props.mixtape.description}</div>
        </div>

        <div className="mixtape-card-delete">
          <div>
            <IconButton component={<HighlightOffIcon />} />
          </div>
        </div>
      </Card>
   
  );
};

export default MixtapeCard;
