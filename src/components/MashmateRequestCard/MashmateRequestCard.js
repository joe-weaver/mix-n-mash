import React from "react";
import { Card } from "react-bootstrap";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import { formatDate } from "../../utils/DateUtils";

import "./MashmateRequestCardStyle.css";

const MashmateRequestCard = (props) => {
  return (
    <Card className="mashmate-request-card mm-card" key={props.mashmateRequest.senderId}>
      <div className="mashmate-request-body">
        <div className="mashmate-request-title">
        
        {/*NEED TO CHANGE USER/0 FOR RESPECTIVE IDS*/}
        <Link to={"/User/" + props.mashmateRequest.senderId}>
        <div className="mixtape-result-user mm-link-blue"><b>{props.mashmateRequest.username}</b></div>
        </Link>
        </div>
        <div className="mashmate-request-timeSent">
          {" Time Sent: " +
            formatDate(props.mashmateRequest.timeSent)}
        </div>
      </div>
      <div className="mashmate-request-responses">
        {/*Button paddings are too big, thus they are too far apart  */}
        <IconButton component={<CheckCircleIcon />} onClick={() => props.resolve(props.mashmateRequest.senderId, props.mashmateRequest.username, true)} />
        <IconButton component={<CancelIcon />} onClick={() => props.resolve(props.mashmateRequest.senderId, props.mashmateRequest.username, false)} />
      </div>
    </Card>
  );
};

//Assuming we make usernames only ....15characters long max, at best
//the requstCards still resize to the longest name
//so if the longest name in the request is only 8chars long
//then all the cards wont be the max size
export default MashmateRequestCard;
