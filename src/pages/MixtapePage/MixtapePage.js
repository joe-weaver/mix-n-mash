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
import YouTube from "react-youtube";

import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import AddSongModal from "../../components/Modals/AddSongModal"
import AddCollaboratorModal from "../../components/Modals/AddCollaboratorModal"
import MashMixtapeModal from "../../components/Modals/MashMixtapeModal";
import Comment from "../../components/Comments/Comment";
import { mixtapesClient, getMixtape, 
  addSongs as addSongsMut,
  editSongs as editSongsMut,
  addComment as addCommentMut,
  addReply as addReplyMut} from "../../services/mixtapesService"; 

import "../Page.css";
import "./MixtapePageStyle.css";

const MixtapePage = (props) => {
  // Extract the id from the url
  let url = window.location.pathname.split("/");
  const id = url[url.length - 1];

  // Extract the user from the session
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  /* ---------- HOOKS ---------- */
  // Mixtape editing
  const [editingMixtapeTitle, setEditingMixtapeTitle] = React.useState(false);
  const [editingSongs, setEditingSongs] = React.useState(false);
  const [editList, setEditList] = React.useState([]);
  const [editView, setEditView] = React.useState(null);

  // Song playing
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [autoplay, setAutoplay] = React.useState(0);

  // Commenting
  const [commentText, setCommentText] = React.useState("");
  const [replyIndex, setReplyIndex] = React.useState(-1);

  /* ---------- QUERIES ---------- */
  let {loading, data} = useQuery(getMixtape, {client: mixtapesClient, variables: {id: id}});


  /* ---------- MUTATIONS ---------- */
  const [addSongsMutation] = useMutation(addSongsMut, {client: mixtapesClient});
  const [addCommentMutation] = useMutation(addCommentMut, {client: mixtapesClient});
  const [addReplyMutation] = useMutation(addReplyMut, {client: mixtapesClient});
  const [editSongsMutation] = useMutation(editSongsMut, {client: mixtapesClient});


  /* ---------- CALLBACKS ---------- */
  // Callback for when we add songs to the backend
  const addSongs = (songs) => {
    addSongsMutation({variables: {id: id, songs: songs}});
  }

  // Callback for when we submit a comment
  const submitComment = (event) => {
    // Don't reload page
    event.preventDefault();

    // Add a comment to the backend (and update when it returns)
    const comment = {
      userId: user._id,
      username: user.username,
      content: commentText
    };
    addCommentMutation({variables: {id: data.mixtape._id, comment: comment}});

    // Remove comment text
    setCommentText("");
  }

  const submitReply = (commentId, replyText) => {
        // Add a comment to the backend (and update when it returns)
        const reply = {
          userId: user._id,
          username: user.username,
          content: replyText
        };

        addReplyMutation({variables: {id: data.mixtape._id, commentId: commentId, reply: reply}});
    
        // Remove comment text
        setReplyIndex(-1);
  }

  // Callback for when the current song is done playing
  const changeToNextSong = (event) => {
    if(!loading){
      let index = (currentSongIndex + 1) % data.mixtape.songs.length;

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

  const moveSongEarlier = (index) => {
    if (!loading){
      if (index !== 0){
        let tempSongsArr = editList.slice();
        let tempSong = tempSongsArr[index];
        tempSongsArr[index] = tempSongsArr[index-1];
        tempSongsArr[index-1] = tempSong;
        setEditList(tempSongsArr);
        let list = editList.map (song => 
          (
            {youtubeId: song.youtubeId,
            name: song.name,
            }
          )
        )
        editSongsMutation({variables: {id: id, songs: list}});
      }
    }
  }

  const moveSongLater = (index) => {
    if (!loading){
      if (index !== data.mixtape.songs.length-1){
        let tempSongsArr = editList.slice();
        let tempSong = tempSongsArr[index];
        tempSongsArr[index] = tempSongsArr[index+1];
        tempSongsArr[index+1] = tempSong;
        setEditList(tempSongsArr);
        let list = editList.map (song => 
          (
            {youtubeId: song.youtubeId,
            name: song.name,
            }
          )
        )
        editSongsMutation({variables: {id: id, songs: list}});
      }
    }
  }
  
  const enableEditing = () =>{
    setEditingSongs(true);
    setEditList(data.mixtape.songs.slice());

  }

  const disableEditing = () => {
    confirmRemoveSongs();
    setEditingSongs(false);

  }

  const removeSong = (index) => {
    let list = editList.filter((song, i) => i !== index);
    setEditList(list);
  }

  const confirmRemoveSongs = () => {
    let list = editList.map (song => ({youtubeId: song.youtubeId, name: song.name})); 
          
    editSongsMutation({variables: {id: id, songs: list}});
    setEditList([]);
  }

  const userCanEdit = () => {
    if (!loading){
      if (data.mixtape.ownerId === user._id){ return true; }
      if (data.mixtape.collaborators.reduce((acc, x) => (x.userId === user._id && x.privilegeLevel === "edit") || acc, false)){ return true; }
      return false;
    }
  }

  if (!loading && editView==null){
    setEditView(userCanEdit())
  }

  const genres=[
    {value: "Jazz", selected: false}, 
    {value: "Rock", selected: false}, 
    {value: "Ska", selected: false}, 
    {value: "Pop", selected: false}, 
    {value: "Classical", selected: false}
  ];

  // const [genres, setGenres] = React.useState(GENRES);

  if (!loading){
    for (let mixtapeGenre of data.mixtape.genres){
      for (let genre of genres){
        if (mixtapeGenre === genre.value){
          genre.selected = true;
          break;
        }
      }
    }
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
              {editView ? (<div>Genres: <Multiselect multiple data={genres}/></div>):
              (<div>Genres: {!loading && <span>{data.mixtape.genres.join(", ")}</span>}</div>)}
            </div>
            <div className="song-container">
              <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                {editView && (!editingSongs ? (
                  <IconButton component={<EditIcon />}
                    callback={enableEditing}/>) 
                  : (
                  <IconButton component={<SaveIcon />}
                    callback={disableEditing}/>
                ))}
                <div className="space-below">Songs</div>
              </div>
              <div className="scroll-content song-list space-below">
                {!loading && !editingSongs && data.mixtape.songs.map((song, index) => (
                  <SongCard song={song} key={index} editingSongs={editingSongs} removeCallback={() => removeSong(index)} moveSongEarlierCallback={() => moveSongEarlier(index)} moveSongLaterCallback={() => moveSongLater(index)}/>
                ))}
                {!loading && editingSongs && editList.map((song, index) => (
                  <SongCard song={song} key={index} editingSongs={editingSongs} removeCallback={() => removeSong(index)} moveSongEarlierCallback={() => moveSongEarlier(index)} moveSongLaterCallback={() => moveSongLater(index)} />
                ))}
              </div>
              <div>
              {editView && <AddSongModal addSongsCallback={addSongs} disabledButton={editingSongs} />}
              </div>
              
            </div>
          </div>
          <div>
            {!loading && <div>{data.mixtape.description}</div>}
          </div>
          <div className="comment-section-container space-above">
            <div>
              <Card className="comments-card">
                <Card.Header>
                  <div className="space-above" style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
                    <div>Leave a Comment: </div>
                    <Form onSubmit={submitComment}>
                      <Form.Control
                        type="input"
                        value={commentText}
                        placeholder={"Write your comment here..."}
                        style={{width:"80% !important"}}
                        onChange={event => setCommentText(event.target.value)}
                      />
                    </Form>
                  </div>
                </Card.Header>
                <Card.Body className="scroll-content comments-section">
                  {!loading && data.mixtape.comments.map((comment, index) =>
                    <Comment
                      comment={comment}
                      startReply={() => setReplyIndex(index)}
                      replying={index === replyIndex}
                      submitReply={(replyText) => submitReply(comment.id, replyText)}
                  />)}
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