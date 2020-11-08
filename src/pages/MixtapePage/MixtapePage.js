import React from "react";
import { Card, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from "react-router-dom";
import Multiselect from "react-bootstrap-multiselect"
import { useQuery, useMutation } from "@apollo/client";

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


var dropdownState = "Today";

const MixtapePage = (props) => {
    // Extract the id from the url
    let url = window.location.pathname.split("/");
    const id = url[url.length - 1];

    let [editingMixtapeTitle, setEditingMixtapeTitle] = React.useState(false);
    let {loading, error, data, refetch} = useQuery(getMixtape, {client: mixtapesClient, variables: {id: id}});
    const [addSongsMutation, _] = useMutation(addSongsMut, {client: mixtapesClient, update: (cache, mutationResult) => {
      console.log(cache);
      console.log(mutationResult);
    }})

    const addSongs = (songs) => {
      addSongsMutation({variables: {id: id, songs: songs}});
    }

    // const [addCommentsMutation] = useMutation(addCommentsMut, {client: mixtapesClient, update: (cache, mutationResult) => {
    //   console.log(cache);
    //   console.log(mutationResult);
    // }})

    // const addComments = (comments) => {
    //   addCommentsMutation({variables: {id: id, comments: comments}});
    // }

  return (
    <div className="page-container">
      <Navbar />
      <Card className="page-content">

        {/* The Mixtape Header */}
        {!loading &&
        <Card.Header className="mixtape-page-header">
          <Form.Group controlId="formBasicCheckbox" style={{display: "flex", flexDirection: "row"}}>
            <Form.Check type="checkbox" defaultValue="" />
            <Form.Label style={{paddingLeft: "1vw"}}>Public</Form.Label>
          </Form.Group>
          <div className="mixtape-title-container">
            {!editingMixtapeTitle ? (
              <IconButton component={<EditIcon />}
                callback={() => setEditingMixtapeTitle(true)}/>) 
              : (
              <IconButton component={<SaveIcon />}
                callback={() => setEditingMixtapeTitle(false)}/>
            )}
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
            <AddCollaboratorModal />
          </div>
        </Card.Header>}

        {/* The Mixtape Body */}
        <Card.Body className="scroll-content">
          <div className="song-and-video">
            <div className="video-container">
              <img className="video-preview" src={"https://img.youtube.com/vi/"+(loading ? "" : data.mixtape.songs[0].youtubeId)+"/0.jpg"} />
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
              <div>Genres: <Multiselect multiple data={[{value: "Jazz"}, {value: "Rock"}, {value: "Ska"}, {value: "Pop"}, {value: "Classical"}]}/></div>
            </div>
            <div className="song-container">
              <div className="space-below">Songs</div>
              <div className="scroll-content song-list space-below">
                {!loading && data.mixtape.songs.map((song) => (
                  <SongCard song={song} />
                ))}
              </div>
              <AddSongModal addSongsCallback={addSongs} />
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