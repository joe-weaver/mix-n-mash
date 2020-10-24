import React from "react";
import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import { Card } from "react-bootstrap";
import Dropdown from "../../components/Dropdown/Dropdown";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";

import "../Page.css";

const items = [
  "Mixtapes",
  "Users",
  "Any"
];

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    // Extract the id from the url
    let url = window.location.pathname.split("/results?search_query=");
    let id = parseInt(url[url.length - 1]);
    this.state = { id: id, loading: true, mixtape: null};

    //this.getMixtape();
    this.state = { mixtapes: [
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

  }

  mockSearch = () => {
    fetch("/TestData.json")
      .then(response => {return response.json();})
      .then(jsonResponse => this.setState({ mixtapes: jsonResponse.data }));
  };

  render() {
    return (
      <div>
        <div className="page-container">
          <Navbar currentPage={NavbarLinks} />
          <Card className="page-content">
            <Card.Header className="content-header">
              <div><h1>Search Results</h1>
              Searching for: </div>
              <div>
                <Dropdown
                  title="MyDropdown"
                  items={items}
                  selectionCallback={(key) => console.log(key)}
                />
                <IconButton
                  component={<RefreshIcon />}
                  callback={this.mockSearch}
                ></IconButton>

                {/*May need another smaller dropdown for sorting
                and Filter Hyperlink that opens up a modal with checkboxes 
                
                Both located below Hottest Dropdown and Refresh-button*/}
              </div>
            </Card.Header>
            <Card.Body className="scroll-content">
              {this.state.mixtapes.map((mixtape) => (
                <MixtapeResultCard mixtape={mixtape} />
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

