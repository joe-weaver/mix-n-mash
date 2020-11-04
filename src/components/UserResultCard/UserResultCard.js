import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./UserResultCardStyle.css";

const UserResultCard = (props) => {
  return (
    <Card className="user-result mm-card" key={props.user._id}>
      
      <div className="user-result-image"></div>

      <div className="user-result-body">
        <Link to={"/user/" + props.user._id}>
          <div className="user-result-title mm-link-light"><h4>{props.user.username}</h4></div>
        </Link>

        <div className="user-result-description">
          {props.user.bio}
        </div>
      </div>

      <div className="user-result-stats">
      </div>
    </Card>
   
  );
};

export default UserResultCard;
