import React from "react";
import { Card } from "react-bootstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import { useMutation } from "@apollo/client";

import {mixtapesClient, removeMixtape as removeMixtapeMut} from "../../services/mixtapesService"
import { useAuth } from "../../utils/use-auth";

import "./MixtapeCardStyle.css";

const MixtapeCard = (props) => {

  const auth = useAuth();

  const [removeMixtape] = useMutation(removeMixtapeMut, {client: mixtapesClient});
  const doRemoveMixtape = () => {removeMixtape({variables: {id: props.mixtape._id}}); props.refetchMyMixtapes();}
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
            {props.mixtape.ownerId === auth.user._id ?
            (<IconButton component={<HighlightOffIcon />} onClick={() => doRemoveMixtape()}/>):
            (<div></div>)}  
          </div>
        </div>
      </Card>
   
  );
};

export default MixtapeCard;
