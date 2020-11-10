import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from "react-router-dom";
import Multiselect from "react-bootstrap-multiselect"
import { useQuery, useMutation } from "@apollo/client";
import YouTube from "react-youtube";

import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import AddSongModal from "../../components/Modals/AddSongModal"
import AddCollaboratorModal from "../../components/Modals/AddCollaboratorModal"
import MashMixtapeModal from "../../components/Modals/MashMixtapeModal";
import Comment from "../../components/Comments/Comment";
import { mixtapesClient, getMixtape, addSongs as addSongsMut } from "../../services/mixtapesService"; 

import "../Page.css";
import "./MixtapePageStyle.css";

const MixtapePage = (props) => {
  // Extract the id from the url
  let url = window.location.pathname.split("/");
  const id = url[url.length - 1];

  let [editingMixtapeTitle, setEditingMixtapeTitle] = React.useState(false);
  let {loading, error, data} = useQuery(getMixtape, {client: mixtapesClient, variables: {id: id}});
  const [addSongsMutation, _] = useMutation(addSongsMut, {client: mixtapesClient});

  const addSongs = (songs) => {
    addSongsMutation({variables: {id: id, songs: songs}});
  }

  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [autoplay, setAutoplay] = React.useState(0);

  const [editView, setEditView] = React.useState(null)

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const changeToNextSong = (event) => {
    if(!loading){
      let index = (currentSongIndex + 1) % data.mixtape.songs.length;
      console.log("Setting index to..." + index)
      setCurrentSongIndex(index);

      if(index !== 0){
        setAutoplay(1);
      } else {
        setAutoplay(0);
      }

      // Player state won't update if we play the same song twice in a row. Handle this:
      if(index !== 0 && data.mixtape.songs[index].youtubeId === data.mixtape.songs[index-1].youtubeId){
        event.target.seekTo(0);
      }
    }
  }

  const userCanEdit = () => {
    if (!loading){
      if (data.mixtape.ownerId == user._id){ return true; }
      if (data.mixtape.collaborators.reduce((acc, x) => (x.userId === user._id && x.privilegeLevel === "edit") || acc, false)){ return true; }
      return false;
    }
  }

  if (!loading && editView==null){
    setEditView(userCanEdit())
  }

  

  return (
    <div className="page-container">
      <Navbar />
      <Card className="page-content">
        {/* The Mixtape Header */}
        {!loading &&
        <Card.Header className="mixtape-page-header">
          {editView ? (
          <Form.Group controlId="formBasicCheckbox" style={{display: "flex", flexDirection: "row"}}>
            <Form.Check type="checkbox" defaultValue="" />
            <Form.Label style={{paddingLeft: "1vw"}}>Public</Form.Label>
          </Form.Group>
          ):
          (<Form.Group controlId="formBasicCheckbox" style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
            <div> </div>
          </Form.Group>)
          }  
          <div className="mixtape-title-container">
            {editView &&
            <div>
            {!editingMixtapeTitle ? (
              <IconButton component={<EditIcon />}
                callback={() => setEditingMixtapeTitle(true)}/>) 
              : (
              <IconButton component={<SaveIcon />}
                callback={() => setEditingMixtapeTitle(false)}/>
            )}
            </div>
            }
            <div className="mixtape-page-title">
              <Form.Control
                type="input"
                className="mixtape-title"
                defaultValue={!loading && data.mixtape.title}
                disabled={!editingMixtapeTitle}
                maxLength="50"
              />
              {!loading && <Link to={"/User/" + data.mixtape.ownerId}><div className="mm-link-dark">{data.mixtape.ownerName}</div></Link>}
            </div>
          </div>
          <div>
            <MashMixtapeModal />
            <IconButton component={<CallSplitIcon />} />
            {editView &&
            <AddCollaboratorModal />
            }
          </div>
        </Card.Header>}

        {/* The Mixtape Body */}
        <Card.Body className="scroll-content">
          <div className="song-and-video">
            <div className="video-container">
              {!loading && <YouTube className="video-preview" 
                videoId={data.mixtape.songs.length > 0 ? data.mixtape.songs[currentSongIndex].youtubeId : ""}
                onEnd={changeToNextSong} opts={{playerVars: { autoplay: autoplay}}}
              />}
              <div className="likes-listens">
                <div>
                  <IconButton component={<ThumbUpIcon />} />
                  <IconButton component={<ThumbDownIcon />} />
                </div>
                <div>
                  Likes: {!loading && data.mixtape.likes}
                </div>
                <div>
                  Listens: {!loading && data.mixtape.listens}
                </div>
              </div>
              {editView ? (<div>Genres: <Multiselect multiple data={[{value: "Jazz"}, {value: "Rock"}, {value: "Ska"}, {value: "Pop"}, {value: "Classical"}]}/></div>):
              (<div>Genres: {!loading && <span>{data.mixtape.genres.join(", ")}</span>}</div>)}
            </div>
            <div className="song-container">
              <div className="space-below">Songs</div>
              <div className="scroll-content song-list space-below">
                {!loading && data.mixtape.songs.map((song) => (
                  <SongCard song={song} />
                ))}
              </div>
              {editView &&
              <AddSongModal addSongsCallback={addSongs} />
              }
            </div>
          </div>
          <div className="comment-section-container space-above">
            <div>
              <Card className="comments-card">
                <Card.Header>
                  <div className="space-above" style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
                    <div>Leave a Comment: </div>
                    <input class="form-control" type="text" placeholder="Write your comment here..." style={{width:"80%"}}/>
                  </div>
                </Card.Header>
                <Card.Body className="scroll-content comments-section">
                  {/* {!loading && data.mixtape.comments.map(comment => <Comment comment={comment} />)} */}
                  
                </Card.Body>
              </Card>
            </div>
          </div>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}

export default MixtapePage;