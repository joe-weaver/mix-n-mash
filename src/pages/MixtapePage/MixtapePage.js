import React from "react";
import { Card, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from "react-router-dom";
import Multiselect from "react-bootstrap-multiselect"

import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import AddSongModal from "../../components/Modals/AddSongModal"
import AddCollaboratorModal from "../../components/Modals/AddCollaboratorModal"
import Comment from "../../components/Comments/Comment";

import "../Page.css";
import "./MixtapePageStyle.css";

export default class MixtapePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {loading: true};

    // Extract the id from the url
    let url = window.location.pathname.split("/");
    let id = parseInt(url[url.length - 1]);

    this.state = { id: id, loading: true, mixtape: null, editingMixtapeTitle: false };

    this.getMixtape();
  }

  getMixtape() {
    fetch("/TestData.json")
      .then(response => response.json())
      .then(jsonResponse => {
        let mixtape = null;
        for(let m of jsonResponse.data){
          if(parseInt(m._id) === this.state.id){
            mixtape = m;
          }
        }
        this.setState({loading: false, mixtape: mixtape})
      });
  }

  render() {
    return (
      <div className="page-container">
        <Navbar />
        <Card className="page-content">

          {/* The Mixtape Header */}
          {!this.state.loading &&
          <Card.Header className="mixtape-page-header">
            <Form.Group controlId="formBasicCheckbox" style={{display: "flex", flexDirection: "row"}}>
              <Form.Check type="checkbox" defaultValue="" />
              <Form.Label style={{paddingLeft: "1vw"}}>Public</Form.Label>
            </Form.Group>
            <div className="mixtape-title-container">
              {!this.state.editingMixtapeTitle ? (
                <IconButton component={<EditIcon />}
                  callback={() => this.setState({ editingMixtapeTitle: true })}/>) 
                : (
                <IconButton component={<SaveIcon />}
                  callback={() => this.setState({ editingMixtapeTitle: false })}/>
              )}
              <div className="mixtape-page-title">
                <Form.Control
                  type="input"
                  className="mixtape-title"
                  defaultValue={this.state.mixtape.title}
                  disabled={!this.state.editingMixtapeTitle}
                  maxLength="50"
                />
                <Link><div className="mm-link-dark">{this.state.mixtape.owner.username}</div></Link>
              </div>
            </div>
            <div>
              <IconButton component={<CallMergeIcon />} />
              <IconButton component={<CallSplitIcon />} />
              <AddCollaboratorModal />
            </div>
          </Card.Header>}

          {/* The Mixtape Body */}
          <Card.Body className="scroll-content">
            <div className="song-and-video">
              <div className="video-container">
                <img className="video-preview" src={"https://img.youtube.com/vi/"+(this.state.loading ? "" : this.state.mixtape.songs[0]).youtubeId+"/0.jpg"} />
                <div className="likes-listens">
                  <div>
                    <IconButton component={<ThumbUpIcon />} />
                    <IconButton component={<ThumbDownIcon />} />
                  </div>
                  <div>
                    Likes: {!this.state.loading && this.state.mixtape.likes}
                  </div>
                  <div>
                    Listens: {!this.state.loading && this.state.mixtape.listens}
                  </div>
                </div>
                <div>Genres: <Multiselect multiple data={[{value: "Jazz"}, {value: "Rock"}, {value: "Ska"}, {value: "Pop"}, {value: "Classical"}]}/></div>
              </div>
              <div className="song-container">
                <div className="space-below">Songs</div>
                <div className="scroll-content song-list space-below">
                  {!this.state.loading && this.state.mixtape.songs.map((song) => (
                    <SongCard song={song} />
                  ))}
                </div>
                <AddSongModal />
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
                    {!this.state.loading && this.state.mixtape.comments.map(comment => <Comment comment={comment} />)}
                    
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
}
