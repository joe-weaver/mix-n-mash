import React from "react";
import { Link } from "react-router-dom";

import "./MixtapeResultCardStyle.css";

const MixtapeResultCard = (props) => {
  return (
    <div className="mixtape-result-card">
      <div className={"title" + (props.index%2 === 0 ? " even" : " odd")}>
        <Link className="mm-link-dark" to={"/Mixtape/" + props.mixtape._id}>{props.mixtape.title}</Link>
        <div className="stats">
          <div>Likes: {props.mixtape.likes}</div>
          <div>Listens: {props.mixtape.listens}</div>
          {/* <div>Genres: {props.mixtape.genres.length < 5 ? props.mixtape.genres.join(", ") : props.mixtape.genres.slice(0, 4).join(", ") + "..."}</div> */}
          <div>Genres: {props.mixtape.genres.join(", ")}</div>
        </div>
      </div>
      <div className="mixtape-image">
        {props.mixtape.songs.length > 0 && <img src={"https://img.youtube.com/vi/" + props.mixtape.songs[0].youtubeId + "/0.jpg"} alt="" className="thumbnail-image"/>}
      </div>
      <div className="mixtape-details">Mixed By: <Link to={"/User/" + props.mixtape.ownerId} className="mm-link-pink">{props.mixtape.ownerName}</Link></div>
    </div>
  );
};

export default MixtapeResultCard;
