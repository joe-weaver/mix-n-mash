import React from "react";
import { Card } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowUpwardSharpIcon from "@material-ui/icons/ArrowUpwardSharp"
import ArrowDownwardSharpIcon from"@material-ui/icons/ArrowDownwardSharp"

import IconButton from "../IconButton/IconButton";

import "./SongCardStyle.css";

const SongCard = (props) => {
 
  return (
    <Card key={props.song.name} className={"song-card mm-card" + (props.index%2 === 0 ? " even" : " odd")}>
      {!props.editingSongs && <div>{(props.songIndex + 1) + ":"}</div>}
      <div>
        <img src={"https://img.youtube.com/vi/"+props.song.youtubeId+"/0.jpg"} alt="" className="thumbnail-image"/> 
      </div>
      
      <div className="song-title">
        {props.song.name}
      </div>

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