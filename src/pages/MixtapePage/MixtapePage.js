import React from "react";
import { Card, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";

import SongCard from "../../components/SongCard/SongCard";
import AddSongModal from "../../components/Modals/AddSongModal"
import AddCollaboratorModal from "../../components/Modals/AddCollaboratorModal"

import "../Page.css";
import "./MixtapePageStyle.css";

const songs = [
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"},
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"},
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"},
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"},
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"},
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"},
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"},
  {name: "Land Down Under", youtubeId: "XfR9iY5y94s"}
];

export default class MixtapePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    };

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
          {!this.state.loading &&
          <Card.Header className="mixtape-page-header">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Public" defaultValue="" />
            </Form.Group>
            {!this.state.editingMixtapeTitle && (
              <IconButton
                component={<EditIcon />}
                callback={() => this.setState({ editingMixtapeTitle: true })}
              />
            )}
            {this.state.editingMixtapeTitle && (
              <IconButton
                component={<SaveIcon />}
                callback={() => this.setState({ editingMixtapeTitle: false })}
              />
            )}
            <div className="mixtape-page-title">
              <Form.Control
                type="email"
                className="mixtape_title"
                defaultValue={this.state.mixtape.title}
                disabled={!this.state.editingMixtapeTitle}
                maxLength="50"
              />
              <Link>{this.state.mixtape.owner.username}</Link>
            </div>
            <IconButton component={<CallMergeIcon />} />
            <IconButton component={<CallSplitIcon />} />
            <AddCollaboratorModal />
          </Card.Header>}
          <Card.Body>
            <div className="song-container">
              <div className="video-preview">
                <img src={"https://img.youtube.com/vi/"+songs[0].youtubeId+"/0.jpg"} style={{height: "180pt"}} />
              </div>
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                Songs
                <div className="scroll-content" style={{maxHeight: "124pt"}}>
                  {songs.map((song) => (
                    <SongCard song={song} />
                  ))}
                </div>
                <AddSongModal />
              </div>
            </div>
          </Card.Body>
          {!this.state.loading &&
          <Card.Body>
            <div className="comment-section-container">
              <div className="comment-section-header">
                <div>
                  <IconButton component={<ThumbUpIcon />} />
                  <IconButton component={<ThumbDownIcon />} />
                </div>
                <div>
                  Likes: {this.state.mixtape.likes}
                </div>
                <div>
                  Listens: {this.state.mixtape.listens}
                </div>
              </div>
              <div>

              </div>
            </div>
          </Card.Body>
          }
          <Card.Footer></Card.Footer>
        </Card>
      </div>
    );
  }
}
