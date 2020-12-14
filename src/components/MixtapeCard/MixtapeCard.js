import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import GroupIcon from '@material-ui/icons/Group';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HowToRegIcon from '@material-ui/icons/HowToReg';
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
    <div className="mixtape-card">
      <div className={"title" + (props.index%2 === 0 ? " even" : " odd")}>
        <div>
          <Link className="mm-link-dark" to={"/Mixtape/" + props.mixtape._id}>{props.mixtape.title}</Link>
          <div className="details">
            {props.mixtape.private && <div><VisibilityOffIcon /> <span>Private</span></div>}
            {!props.mixtape.private && <div><VisibilityIcon /> <span>Public</span></div>}
            <div><GroupIcon /> <span>{props.mixtape.collaborators.length + " Collaborator" + (props.mixtape.collaborators.length !== 1 ? "s" : "")}</span> </div>
            {props.mixtape.ownerId === auth.user._id && <div><HowToRegIcon /><span>You own this</span></div>}
          </div>
        </div>
        {props.mixtape.ownerId === auth.user._id && (<IconButton component={<CancelIcon />} onClick={() => doRemoveMixtape()}/>)}
      </div>
      <div className="mixtape-image">
        {props.mixtape.songs.length > 0 && <img src={"https://img.youtube.com/vi/" + props.mixtape.songs[0].youtubeId + "/0.jpg"} alt="" className="thumbnail-image"/>}
      </div>
      <div className="mixtape-details">Owner: <Link to={"/User/" + props.mixtape.ownerId} className="mm-link-pink">{props.mixtape.ownerName}</Link></div>
    </div>
  );
};

export default MixtapeCard;
