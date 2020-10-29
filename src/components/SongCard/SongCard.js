import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";

import IconButton from "../IconButton/IconButton";

import "./SongCardStyle.css";

const SongCard = (props) => {
  return (
    <Card className="song-card mm-card" key={props.song.name}>
      <img src={"https://img.youtube.com/vi/"+props.song.youtubeId+"/0.jpg"} className="thumbnail-image"/>
      <div className="song-title">{props.song.name}</div>
      <IconButton component={<CancelIcon />} />
    </Card>
  );
};

export default SongCard;