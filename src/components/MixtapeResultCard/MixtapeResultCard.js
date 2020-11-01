import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MixtapeResultCardStyle.css";

const MixtapeResultCard = (props) => {
  return (
    <Card className="mixtape-result mm-card" key={props.mixtape._id}>
      
      <div className="mixtape-result-image"></div>

      <div className="mixtape-result-body">
        <Link to={"/Mixtape/" + props.mixtape._id}>
          <div className="mixtape-result-title mm-link-light"><h4>{props.mixtape.title}</h4></div>
        </Link>

        <Link to={"/User/" + props.mixtape.ownerId}>
          <div className="mixtape-result-user mm-link-dark">{props.mixtape.owner.username}</div>
        </Link>

        <div className="mixtape-result-description">
          {props.mixtape.description}
        </div>
      </div>

      <div className="mixtape-result-stats">
        <div>
          Listens: {props.mixtape.listens}
          <br /> Likes: {props.mixtape.likes}
          <br /> Genres:{" "}
          {props.mixtape.genres.reduce((acc, genre) => acc + ", " + genre, "").substring(2)}
        </div>
      </div>
    </Card>
   
  );
};

export default MixtapeResultCard;
