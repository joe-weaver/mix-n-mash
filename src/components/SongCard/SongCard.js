import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowUpwardSharpIcon from "@material-ui/icons/ArrowUpwardSharp"
import ArrowDownwardSharpIcon from"@material-ui/icons/ArrowDownwardSharp"

import IconButton from "../IconButton/IconButton";

import "./SongCardStyle.css";

const SongCard = (props) => {
  //const [showCancel, setCancelShow] = React.useState(true);
  //"song-card mm-btn-warning"
  const [cardColor, setCardColorState] = React.useState("song-card mm-card");

  // const toggleClass = () => {
  //   console.log("PROPS " + props.editingSongs);
  //   setCancelShow(props.editingSongs);
  //   if (cardColor == "song-card mm-card"){
  //     setCardColorState("song-card mm-btn-warning");
  //     console.log("WARNING COLOR");
  //   }
  //   else{
  //     setCardColorState("song-card mm-card");
  //     console.log("SEA GLASS COLOR");
  //   }
  // };

  return (
    <Card className={cardColor} key={props.song.name}>
      <img src={"https://img.youtube.com/vi/"+props.song.youtubeId+"/0.jpg"} className="thumbnail-image"/>
      <div className="song-title">{props.song.name}</div>
      <div style={{display:"inline-flex", flexDirection:"row", justifyContent:"flex-end", alignItems:"center", inlineSize:"6rem"}}>
        {props.editingSongs ? <IconButton 
              component={<ArrowUpwardSharpIcon /> } 
              callback = {() => props.moveSongEarlierCallback()}
            > </IconButton> : <div></div> }
        {props.editingSongs ? <IconButton 
              component={<ArrowDownwardSharpIcon /> } 
              callback = {() => props.moveSongLaterCallback()}
        > </IconButton> : <div></div> }
        {props.editingSongs ? <IconButton 
              component={<CancelIcon /> } 
              callback = {() => props.removeCallback()}
            > </IconButton> : <div></div> }
      </div>
    </Card>
  );
};

export default SongCard;