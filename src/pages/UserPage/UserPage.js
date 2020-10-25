import React from "react";
import { Card, Button, FormControl, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Link } from "react-router-dom";
import { NavbarLinks } from "../../data/NavbarLinks";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";

import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";

import "../Page.css";
import "./UserPageStyle.css";

const user_name = "RyzonX"
const user_description = "This is the default user-page description."

export default class MixtapePage extends React.Component {
  constructor(props) {
    super(props);

    // Extract the id from the url
    let url = window.location.pathname.split("/");
    let id = parseInt(url[url.length - 1]);
    this.state = { id: id, loading: true, mixtape: null,
      mixtapes: [
        {
        "_id": 0,
          "title": "Kings of Music",
          "description": "Royal Music you'd enjoy listening to for days.",
          "genres": ["Pop"],
          "image": ["image.jpg"],
          "songs": ["song1"],
          "ownerId": 1,
          "owner": { "username": "RyzonX" },
          "listens": 510431,
          "likes": 510431,
          "dislikes": 0,
          "comments": [],
          "private": false,
          "collaborators": [],
          "timeCreated": 1122334455,
          "likesPerDay": [],
          "listensPerDay": []
      },
      {
        "_id": 1,
          "title": "Beethoven Hits",
          "description": "Smooth Music best for relaxing.",
          "genres": ["Classical"],
          "image": ["image.jpg"],
          "songs": ["song1"],
          "ownerId": 1,
          "owner": { "username": "Reinbex" },
          "listens": 874131,
          "likes": 550031,
          "dislikes": 0,
          "comments": [],
          "private": false,
          "collaborators": [],
          "timeCreated": 1122334455,
          "likesPerDay": [],
          "listensPerDay": []
      },
      {
        "_id": 2,
        "title": "Music to die to",
        "description": "You will literally die if you listen to this mixtape. Don't listen to it man. Life is worth living",
        "genres": ["Rock", "Punk"],
        "image": [],
        "songs": [],
        "ownerId": 0,
        "owner": { "username": "thunderbolt67" },
        "listens": 100,
        "likes": 3,
        "dislikes": 5,
        "comments": [],
        "private": false,
        "collaborators": [],
        "timeCreated": 1234567890,
        "likesPerDay": [],
        "listensPerDay": []
      },
      {
        "_id": 3,
        "title": "Jazz Bangers",
        "description": "Lots of Jazz to enjoy and listen to and hear and enjoy and listen to.",
        "genres": ["Jazz"],
        "image": ["image.jpg"],
        "songs": ["song1"],
        "ownerId": 1,
        "owner": { "username": "RyzonX" },
        "listens": 510431,
        "likes": 510431,
        "dislikes": 0,
        "comments": [],
        "private": false,
        "collaborators": [],
        "timeCreated": 1122334455,
        "likesPerDay": [],
        "listensPerDay": []
      },
      {
        "_id": 4,
        "title": "Songs you like to hear",
        "description": "These are the best songs from the best artist compiled by the best mixtape maker - me. I hope you enjoy. Like, subscribe, hit the bell. Love and peace.",
        "genres": ["Jazz", "Modern"],
        "image": [],
        "songs": [],
        "ownerId": 0,
        "owner": { "username": "thunderbolt67" },
        "listens": 10001,
        "likes": 42,
        "dislikes": 2,
        "comments": [],
        "private": false,
        "collaborators": [],
        "timeCreated": 1238675309,
        "likesPerDay": [],
        "listensPerDay": []
      },
      {
        "_id": 5,
        "title": "Life is pain and so is JSON",
        "description": "I just realized I have to import all of this data asynchronously with JavaScript and I hate life.",
        "genres": ["Pain"],
        "image": [],
        "songs": [],
        "ownerId": 0,
        "owner": { "username": "thunderbolt67" },
        "listens": 1234,
        "likes": 252,
        "dislikes": 18,
        "comments": [],
        "private": false,
        "collaborators": [],
        "timeCreated": 28594952737,
        "likesPerDay": [],
        "listensPerDay": []
      },
      {
        "_id": 6,
        "title": "Music to sleep to",
        "description": "You will literally sleep if you listen to this mixtape. Do listen to it man.",
        "genres": ["Rock", "Punk"],
        "image": [],
        "songs": [],
        "ownerId": 1,
        "owner": { "username": "RyzonX" },
        "listens": 100,
        "likes": 3,
        "dislikes": 5,
        "comments": [],
        "private": false,
        "collaborators": [0],
        "timeCreated": 1234567890,
        "likesPerDay": [],
        "listensPerDay": []
      }] };

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
      <div>
        <div className="page-container">
          <Navbar currentPage={NavbarLinks} />
          <Card className="page-content">
            <Card.Header className="content-header">
              <h1>{user_name}</h1>
            </Card.Header>
            <Card.Body>

              {/*Bio stuff  */}
              <div className="user_top_body">
                {user_description}
                <div className= "user_page_buttons">
                <Button className="mm-btn-alt">Send Mashmate Request</Button>
                <Button className="mm-btn-alt">Follow</Button>
                </div>
              </div>

              {/*List of their public mixtapes  */}
              <div className="users_mixtapes-container">
                <h4>{user_name}'s Mixtapes</h4>
                  
                <div className="scroll-content" style={{maxHeight: "275px"}}>
                {this.state.mixtapes.map((mixtape) => (
                <MixtapeResultCard mixtape={mixtape} />
              ))}
                </div>

              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
