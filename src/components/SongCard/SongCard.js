import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";

import IconButton from "../IconButton/IconButton";

import "./SongCardStyle.css";

const SongCard = (props) => {
  return (
    <Card className="song-card" key={props.song.name}>
      <div className="song-body">
        <div className="song-title">
          <img src={"https://img.youtube.com/vi/"+props.song.youtubeId+"/0.jpg"} style={{height:"30pt"}}/>
          <div>{props.song.name}</div>
          <IconButton component={<CancelIcon />} />
        </div>
      </div>
    </Card>
  );
};

export default SongCard;