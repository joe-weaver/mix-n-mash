import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MixtapeResultCardStyle.css";



const MixtapeResultCard = (props) => {
  return (
    <Card className="mixtape-result" key={props.mixtape._id}>
      
      <div className="mixtape-result-image">

      </div>

      <div className="mixtape-result-body">
        <Link to={"/MyMixtapes/" + props.mixtape._id}>
          <div className="mixtape-result-title">{props.mixtape.title}</div>
        </Link>

        <Link to={"/User/" + props.mixtape.ownerId}>
          <div className="mixtape-result-user">
            {props.mixtape.owner.username}
          </div>
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
          {props.mixtape.genres.reduce((acc, genre) => acc + ", " + genre, "")}
        </div>
      </div>
    </Card>
   
  );
};

export default MixtapeResultCard;
