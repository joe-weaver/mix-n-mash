import React from "react";
import { Card } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from '@material-ui/icons/Clear';

import IconButton from "../IconButton/IconButton";

import "./AddSongCardStyle.css";

const AddSongCard = (props) => {
  return (
    <Card className="add-song-card mm-card" key={props.song.name}>
      <img src={"https://img.youtube.com/vi/"+props.song.youtubeId+"/0.jpg"} className="thumbnail-image"/>
      <div>{props.song.name}</div>
      <IconButton component={props.remove ? <ClearIcon/> : <AddIcon />} callback={props.addCallback} />
    </Card>
  );
};

export default AddSongCard;