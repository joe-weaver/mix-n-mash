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
    <Card className={"mashmate-request-card" + (props.index%2 === 0 ? " even" : " odd")} key={props.mashmateRequest.senderId}>
      <div className="mashmate-request-body">
        <div className="mashmate-request-title">
        
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
        <IconButton component={<CheckCircleIcon />} onClick={() => props.resolve(props.mashmateRequest.senderId, props.mashmateRequest.username, true)} />
        <IconButton component={<CancelIcon />} onClick={() => props.resolve(props.mashmateRequest.senderId, props.mashmateRequest.username, false)} />
      </div>
    </Card>
  );
};

export default MashmateRequestCard;
