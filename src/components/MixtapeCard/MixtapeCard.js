import React from "react";
import { Card } from "react-bootstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";

import IconButton from "../IconButton/IconButton";

import "./MixtapeCardStyle.css";

const MixtapeCard = (props) => {
  return (
      <Card className="mixtape-card mm-card" key={props.mixtape._id}>
        <div className="mixtape-card-image"></div>

        <div className="mixtape-card-body">
        <Link to={"/Mixtape/" + props.mixtape._id}>
          <h4 className="mm-link-light">{props.mixtape.title}</h4>
        </Link>
        <Link to={"/User/" + props.mixtape.ownerId}>
          <div className="mm-link-dark">{props.mixtape.ownerName}</div>
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
