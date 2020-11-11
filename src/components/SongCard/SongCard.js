import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";

import IconButton from "../IconButton/IconButton";

import "./SongCardStyle.css";

const SongCard = (props) => {
  const [showCancel, setCancelShow] = React.useState(true);
  //"song-card mm-btn-warning"
  const [cardColor, setCardColorState] = React.useState("song-card mm-card");

  const toggleClass = () => {
    console.log("PROPS " + props.editingSongs);
    setCancelShow(props.editingSongs);
    if (cardColor == "song-card mm-card"){
      setCardColorState("song-card mm-btn-warning");
      console.log("WARNING COLOR");
    }
    else{
      setCardColorState("song-card mm-card");
      console.log("SEA GLASS COLOR");
    }
  };

  return (
    <Card className={cardColor} key={props.song.name}>
      <img src={"https://img.youtube.com/vi/"+props.song.youtubeId+"/0.jpg"} className="thumbnail-image"/>
      <div className="song-title">{props.song.name}</div>
      {!showCancel ? (
      <div></div>) 
      : (
          <IconButton component={<CancelIcon />}> </IconButton>            
      )}
      <IconButton component={<CancelIcon />}
      callback={toggleClass}
      
      //callback={() => setCancelShow(!showCancel), toggleClass}
      />
    </Card>
  );
};

export default SongCard;