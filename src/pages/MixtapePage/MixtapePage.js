import React from "react";
import { Form, Button } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Link } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import { useMutation } from "@apollo/client";
import YouTube from "react-youtube";

import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import AddSongModal from "../../components/Modals/AddSongModal"
import AddCollaboratorModal from "../../components/Modals/AddCollaboratorModal"
import MashMixtapeModal from "../../components/Modals/MashMixtapeModal";
import Comment from "../../components/Comments/Comment";
import { mixtapesClient, 
  addSongs as addSongsMut,
  editSongs as editSongsMut,
  addComment as addCommentMut,
  addReply as addReplyMut,
  createMixtapeFromBase as createMixtapeFromBaseMut,
  updateLikes as updateLikesMut,
  updateDislikes as updateDislikesMut,
  updateMixtapeTitle as updateMixtapeTitleMut,
  updateMixtapeDescription as updateMixtapeDescriptionMut,
  updateMixtapeGenres as updateMixtapeGenresMut,
  updateMixtapePrivate as updateMixtapePrivateMut,
  addListen
  } from "../../services/mixtapesService"; 

import {userClient, updateUserLikes as updateUserLikesMut, updateUserDislikes as updateUserDislikesMut } from "../../services/userService";
import { useAuth } from "../../utils/use-auth";
import { useToast } from "../../utils/use-toast";
import { usePolling } from "../../utils/use-polling";

import "./MixtapePageStyle.css";

export default function MixtapePage(){
    // Extract the mixtape id from the url
    let url = window.location.pathname.split("/");
    const id = url[url.length - 1];

    // Hook into the auth object
    const auth = useAuth();

    // Hook into notifications
    const toaster = useToast();

    // Hook into polling
    const polling = usePolling();
    if (id !== polling.mixtapeId){
        polling.startPolling(id);
    }

    /* ---------- HOOKS ---------- */
    // Mixtape editing
    const [editingMixtapeTitle, setEditingMixtapeTitle] = React.useState(false);
    const [tempTitle, setTempTitle] = React.useState(null);

    const [editingMixtapeDescription, setEditingMixtapeDescription] = React.useState(false);
    const [tempDescription, setTempDescription] = React.useState(null);

    const [editingSongs, setEditingSongs] = React.useState(false);
    const [editList, setEditList] = React.useState([]);

    // Song playing
    const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
    const [autoplay, setAutoplay] = React.useState(0);

    // Commenting
    const [commentText, setCommentText] = React.useState("");
    const [replyIndex, setReplyIndex] = React.useState(-1);

    const [requestPending, setRequestPending] = React.useState(false);

    const [hasListened, setHasListened] = React.useState(false);

    /* ---------- MUTATIONS ---------- */
    const [addSongsMutation] = useMutation(addSongsMut, {client: mixtapesClient});
    const [addCommentMutation] = useMutation(addCommentMut, {client: mixtapesClient});
    const [addReplyMutation] = useMutation(addReplyMut, {client: mixtapesClient});
    const [editSongsMutation] = useMutation(editSongsMut, {client: mixtapesClient});
    const [createMixtapeFromBase] = useMutation(createMixtapeFromBaseMut, {client: mixtapesClient, onCompleted: (data) => {
      // Notify the user a mixtape was created
      toaster.notify("Mixtape Forked", <>You just forked a mixtape!</>);
    }});
    const [updateLikesMutation] = useMutation(updateLikesMut, {client: mixtapesClient});
    const [updateDislikesMutation] = useMutation(updateDislikesMut, {client: mixtapesClient});
    const [updateMixtapeTitleMutation] = useMutation(updateMixtapeTitleMut, {client: mixtapesClient});
    const [updateMixtapeDescriptionMutation] = useMutation(updateMixtapeDescriptionMut, {client: mixtapesClient});
    const [updateMixtapeGenresMutation] = useMutation(updateMixtapeGenresMut, {client: mixtapesClient});
    const [updateMixtapePrivateMutation] = useMutation(updateMixtapePrivateMut, {client: mixtapesClient});

    const [updateUserLikesMutation] = useMutation(updateUserLikesMut, {client: userClient, onCompleted: (data) => {
    auth.getUser({likedMixtapes: data.setLikeMixtape.likedMixtapes, dislikedMixtapes: data.setLikeMixtape.dislikedMixtapes});
    setRequestPending(false);
    }});

    const [updateUserDislikesMutation] = useMutation(updateUserDislikesMut, {client: userClient, onCompleted: (data) => {
    auth.getUser({likedMixtapes: data.setDislikeMixtape.likedMixtapes, dislikedMixtapes: data.setDislikeMixtape.dislikedMixtapes});
    setRequestPending(false);
    }});

    const [addListenMutation] = useMutation(addListen, {client: mixtapesClient});

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
        userId: auth.user._id,
        username: auth.user.username,
        content: commentText
    };
    addCommentMutation({variables: {id: polling.data.mixtape._id, comment: comment}});

    // Remove comment text
    setCommentText("");
    }

    const submitReply = (commentId, replyText) => {
        // Add a comment to the backend (and update when it returns)
        const reply = {
            userId: auth.user._id,
            username: auth.user.username,
            content: replyText
        };

        addReplyMutation({variables: {id: polling.data.mixtape._id, commentId: commentId, reply: reply}});
    
        // Remove comment text
        setReplyIndex(-1);
    }

    // Callback for when the current song is done playing
    const changeToNextSong = (event) => {
        if(!polling.loading){
            let index = (currentSongIndex + 1) % polling.data.mixtape.songs.length;

            setCurrentSongIndex(index);

            if(index !== 0){
                setAutoplay(1);
            } else {
                setAutoplay(0);
            }

            // Player state won't update if we play the same song twice in a row. Handle this:
            if(index !== 0 && polling.data.mixtape.songs[index].youtubeId === polling.data.mixtape.songs[index-1].youtubeId){
                event.target.seekTo(0);
            }
        }
    }

    //Adding a mixtape
    const addMixtape = () => {
    createMixtapeFromBase({variables: {
        ownerId: auth.user._id, 
        ownerName: auth.user.username,
        title: polling.data.mixtape.title, 
        description: polling.data.mixtape.description, 
        genres: polling.data.mixtape.genres, 
        image: polling.data.mixtape.image, 
        songs: polling.data.mixtape.songs.map(song =>({youtubeId: song.youtubeId, name: song.name}))
      }});
    }

    const moveSongEarlier = (index) => {
    if (!polling.loading){
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
    if (!polling.loading){
        if (index !== polling.data.mixtape.songs.length-1){
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

    const startEditingSongs = () =>{
      setEditingSongs(true);
      setEditList(polling.data.mixtape.songs.slice());
    }

    const updateSongs = () => {
      let list = editList.map (song => ({youtubeId: song.youtubeId, name: song.name})); 
              
      editSongsMutation({variables: {id: id, songs: list}});
      setEditList([]);
      setEditingSongs(false);
    }

    const cancelEditingSongs = () => {
      setEditingSongs(false);
    }

    const removeSong = (index) => {
      let list = editList.filter((song, i) => i !== index);
      setEditList(list);
    }
    const userCanEdit = () => {
      if (!polling.loading){
          if (polling.data.mixtape.ownerId === auth.user._id){ return true; }
          if (polling.data.mixtape.collaborators.reduce((acc, x) => (x.userId === auth.user._id && x.privilegeLevel === "edit") || acc, false)){ return true; }
          return false;
      }
      return false;
    }

    const incrementLikes = () => {
      if (!polling.loading){
          if (!requestPending){
          setRequestPending(true);
          let wasDisliked = false;
          if (auth.user.dislikedMixtapes.includes(id)){
            updateDislikesMutation({variables: {id: id, incAmount: -1}});
            wasDisliked = true;
          }
          if (auth.user.likedMixtapes.includes(id)){
            updateLikesMutation({variables: {id: id, userId: auth.user._id, incAmount: -1}});
            updateUserLikesMutation({variables: {id: auth.user._id, mixtapeId: id, mixtapeGenres: polling.data.mixtape.genres, genrePreferences: auth.user.genrePreferences.map(x => ({genre: x.genre, val: x.val})), like: false, wasDisliked}});
          }
          else{
            updateLikesMutation({variables:{id: id, userId: auth.user._id, incAmount: 1}});
            updateUserLikesMutation({variables: {id: auth.user._id, mixtapeId: id, mixtapeGenres: polling.data.mixtape.genres, genrePreferences: auth.user.genrePreferences.map(x => ({genre: x.genre, val: x.val})), like: true, wasDisliked}});
          }
        }
      }
    }

    const incrementDislikes = () => {
      if (!polling.loading){
          if (!requestPending){
          setRequestPending(true);
          let wasLiked = false;
          if (auth.user.likedMixtapes.includes(id)){
            updateLikesMutation({variables: {id: id, userId: auth.user._id, incAmount: -1}});
            wasLiked = true;
          }
          if (auth.user.dislikedMixtapes.includes(id)){
            updateDislikesMutation({variables: {id: id, incAmount: -1}});
            updateUserDislikesMutation({variables: {id: auth.user._id, mixtapeId: id, mixtapeGenres: polling.data.mixtape.genres, genrePreferences: auth.user.genrePreferences.map(x => ({genre: x.genre, val: x.val})), dislike: false, wasLiked}});
          }
          else{
            updateDislikesMutation({variables:{id: id, incAmount: 1}});
            updateUserDislikesMutation({variables: {id: auth.user._id, mixtapeId: id, mixtapeGenres: polling.data.mixtape.genres, genrePreferences: auth.user.genrePreferences.map(x => ({genre: x.genre, val: x.val})), dislike: true, wasLiked}});
          }
        }
      }
    }

    const handleListen = () => {
      if(!hasListened){
          addListenMutation({variables: {id: id, userId: auth.user._id}});
          setHasListened(true);
      }
    }

    const genres=[
    {value: "Alternative Rock"},
    {value: "Ambient"},
    {value: "Blues"},
    {value: "Chill"},
    {value: "Classical"},
    {value: "Country"},
    {value: "Drum and Bass"},
    {value: "Dubstep"},
    {value: "Electronic"},
    {value: "Folk"},
    {value: "Hip Hop"},
    {value: "House"},
    {value: "Indie"},
    {value: "Instrumental"},
    {value: "Jazz"},
    {value: "LoFi"},
    {value: "Metal"},
    {value: "Musical Theatre"}, 
    {value: "New Wave"},
    {value: "Other"},
    {value: "Pop"},
    {value: "Reggae"},
    {value: "Rock"}, 
    {value: "Ska"},
    {value: "Soundtrack"},
    {value: "Swing"}
    ];
    const [options] = React.useState(genres);

    const updateTitle = () => {
        setEditingMixtapeTitle(false);
        
        // Don't update unless the description is different
        if(tempTitle !== null && tempTitle !== polling.data.mixtape.title){
            updateMixtapeTitleMutation({variables: {id: polling.data.mixtape._id, title: tempTitle}});
        }
        setTempTitle(null);
    }

    const cancelUpdateTitle = () => {
        setEditingMixtapeTitle(false);
        setTempTitle(null);
    }

    const updateDescription = () => {
        setEditingMixtapeDescription(false);

        // Don't update unless the description is different
        if(tempDescription !== null && tempDescription !== polling.data.mixtape.description){
            updateMixtapeDescriptionMutation({variables: {id: polling.data.mixtape._id, description: tempDescription}});
        }
        setTempDescription(null);
    }

    const cancelUpdateDescription = () => {
        setEditingMixtapeDescription(false);
        setTempDescription(null);
    }

    const updateMixtapePrivate = () => {
      if(!polling.loading){
        updateMixtapePrivateMutation({variables: {id: polling.data.mixtape._id, private: !polling.data.mixtape.private}});
      }
    }

    const addGenre = (selectedList, selectedItem) => {
        var tempList = [];
        for(var i = 0; i < selectedList.length; i++){
            tempList.push(selectedList[i].value);
        }

        updateMixtapeGenresMutation({variables: {id: polling.data.mixtape._id, genres: tempList}});
        editPreSelected(tempList);
        tempList = [];
    }

    const removeGenre = (selectedList, selectedItem) => {
    var tempList = [];
    for(var i = 0; i < selectedList.length; i++){
        tempList.push(selectedList[i].value);
    }

    updateMixtapeGenresMutation({variables: {id: polling.data.mixtape._id, genres: tempList}});
    editPreSelected(tempList);
    tempList = [];
    }

    function editPreSelected (selectedList) {
    var tempPreSelected = []
    for(var i = 0; i < selectedList.length; i++){
        tempPreSelected.push({value: selectedList[i]});
    }
    preSelected = tempPreSelected;
    }

    var preSelected = [];
    if(!polling.loading){
        editPreSelected(polling.data.mixtape.genres)
    }
    
    return(
      <div className="mm-container scroll-screen">
      <Navbar currentPage={null} />
      <div className="mixtape-container">
      <div className="mixtape-header">
          {userCanEdit() && <Form.Group controlId="formBasicCheckbox" style={{display: "flex", flexDirection: "row"}}>
            <Form.Check type="checkbox" checked={polling.loading ? false : polling.data.mixtape.private} onChange={updateMixtapePrivate}/>
            <Form.Label style={{paddingLeft: "1vw"}}>Private</Form.Label>
          </Form.Group>}
          {!userCanEdit() && <div>{" "}</div>}
          <div>
          <MashMixtapeModal mixtape={!polling.loading ? polling.data.mixtape : null} />
          <IconButton component={<CallSplitIcon onClick={addMixtape}/>} />
          {(!polling.loading && auth.user._id === polling.data.mixtape.ownerId) &&
            <AddCollaboratorModal mixtape={!polling.loading ? polling.data.mixtape : null}/>
          }
          </div>
        </div>
        <div className="title">
            {!userCanEdit() && !polling.loading && polling.data.mixtape.title}
            {userCanEdit() && <div className="title-buttons">
            {!editingMixtapeTitle && (
              <IconButton
                component={<EditIcon />}
                callback={() => setEditingMixtapeTitle(true)}
              />
            )}
            {editingMixtapeTitle && (
              <IconButton
                component={<SaveIcon />}
                callback={updateTitle}
              />
            )}
            {editingMixtapeTitle && (
              <IconButton
                component={<NotInterestedIcon />}
                callback={cancelUpdateTitle}
              />
            )}
            </div>}
            {userCanEdit() && <Form.Control
                as="input"
                className="title-input"
                value={tempTitle !== null ? tempTitle : (!polling.loading && polling.data.mixtape.title)}
                disabled={!editingMixtapeTitle}
                maxLength="50"
                onChange={event => setTempTitle(event.target.value)}
            />}
        </div>
        <h5 className="owner">Mixed By: <Link className="mm-link-pink" to={"/User/" + (!polling.loading && polling.data.mixtape.ownerId)}>{!polling.loading && polling.data.mixtape.ownerName}</Link></h5>
        {/* DESCRIPTION STUFF */}
        <h3 style={{paddingLeft: "4vw", paddingTop: "4vh"}}>Description:</h3>
        {!userCanEdit() && <div className="description-container"><div style={{paddingLeft: "4vw"}}>{!polling.loading && polling.data.mixtape.description}</div></div>}
        {userCanEdit() && <div className="description-container">
          <div className="description-buttons">
            {!editingMixtapeDescription && (
              <IconButton
                component={<EditIcon />}
                callback={() => setEditingMixtapeDescription(true)}
              />
            )}
            {editingMixtapeDescription && (
              <IconButton
                component={<SaveIcon />}
                callback={updateDescription}
              />
            )}
            {editingMixtapeDescription && (
              <IconButton
                component={<NotInterestedIcon />}
                callback={cancelUpdateDescription}
              />
            )}
        </div>
        <Form.Control
          as="textarea"
          className="description"
          value={tempDescription !== null ? tempDescription : (!polling.loading && polling.data.mixtape.description)}
          disabled={!editingMixtapeDescription}
          maxLength="255"
          onChange={event => setTempDescription(event.target.value)}
        />
        </div>}
        {/* SONG STUFF */}
        <h3 style={{paddingLeft: "4vw", paddingTop: "4vh"}}>Songs:</h3>
        <div className="song-container">
          <div>
            <div className="song-buttons">
              {userCanEdit() && !editingSongs && <IconButton component={<EditIcon />} callback={startEditingSongs}/>}
              {userCanEdit() && !editingSongs && !polling.loading && <AddSongModal originalSongLength={polling.data.mixtape.songs.length} addSongsCallback={addSongs} disabledButton={editingSongs} />}
              {userCanEdit() && editingSongs && <IconButton component={<SaveIcon />} callback={updateSongs}/>}
              {userCanEdit() && editingSongs && <IconButton component={<NotInterestedIcon />} callback={cancelEditingSongs}/>}        
            </div>
            <div className="songs-list">
              {!polling.loading && !editingSongs && polling.data.mixtape.songs.map((song, index) => (
                <SongCard song={song} key={index} index={index} songIndex={polling.data.mixtape.songs.indexOf(song)} editingSongs={editingSongs} removeCallback={() => removeSong(index)} moveSongEarlierCallback={() => moveSongEarlier(index)} moveSongLaterCallback={() => moveSongLater(index)}/>
              ))}
              {!polling.loading && editingSongs && editList.map((song, index) => (
                <SongCard song={song} key={index} index={index} songIndex={polling.data.mixtape.songs.indexOf(song)} editingSongs={editingSongs} removeCallback={() => removeSong(index)} moveSongEarlierCallback={() => moveSongEarlier(index)} moveSongLaterCallback={() => moveSongLater(index)} />
              ))}
            </div>
          </div>
          <div className="video-display">
            {!polling.loading && polling.data.mixtape.songs.length > 0 &&
              <YouTube className="video"
                onPlay={handleListen}
                videoId={polling.data.mixtape.songs.length > 0 ? polling.data.mixtape.songs[currentSongIndex].youtubeId : ""}
                onEnd={changeToNextSong} opts={{playerVars: { autoplay: autoplay}}}
            />}
            {!polling.loading && polling.data.mixtape.songs.length === 0 &&
            <div className="video">Add songs to play your mixtape!</div>}
            <div className="likes-listens">
                {!polling.loading &&
                <div>
                  <IconButton component={<ThumbUpIcon style={auth.user.likedMixtapes.includes(id) ? ({color:"var(--primary-color)"}):({})}/>} onClick={incrementLikes} />
                  <IconButton component={<ThumbDownIcon style={auth.user.dislikedMixtapes.includes(id) ? ({color:"var(--warning-color)"}):({})}/>} onClick={incrementDislikes} />
                </div>
                }
                <div>
                  Likes: {!polling.loading && polling.data.mixtape.likes}
                </div>
                <div>
                  Dislikes: {!polling.loading && polling.data.mixtape.dislikes}
                </div>
                <div>
                  Listens: {!polling.loading && polling.data.mixtape.listens}
                </div>
              </div>
              <div>
                {userCanEdit() ? 
                  (
                    <div>
                      Genres: <Multiselect 
                        options={options}
                        displayValue="value"
                        selectedValues={preSelected}
                        onSelect={addGenre} 
                        onRemove={removeGenre}
                        selectionLimit={5}
                        avoidHighlightFirstOption={true}
                        />
                    </div>
                  ):
                  (
                    <div>
                      Genres: {!polling.loading && <span>{polling.data.mixtape.genres.join(", ")}</span>}
                    </div>
                  )
                }
              </div>
            </div>
        </div>
        {/* COMMENT STUFF */}
        <h3 style={{paddingLeft: "4vw", paddingTop: "4vh"}}>Comments:</h3>
        <div className="comments">
          <div className="comments-header">
            <h4>Leave a Comment: </h4>
            <Form onSubmit={submitComment} className="comment-box">
              <Form.Control
                as="textarea"
                value={commentText}
                placeholder={"Write your comment here..."}
                style={{resize: "none", height:"10vh"}}
                onChange={event => setCommentText(event.target.value)}
                maxLength={250}
              />
              <Button type="submit" className="mm-btn" style={{marginTop: "2vh"}}>Submit Comment</Button>
            </Form>
          </div>
          {!polling.loading && polling.data.mixtape.comments.map((comment, index) =>
            <Comment
              comment={comment}
              startReply={() => setReplyIndex(index)}
              replying={index === replyIndex}
              submitReply={(replyText) => submitReply(comment.id, replyText)}
          />)}
        </div>
      </div>
    </div>
    )
          }