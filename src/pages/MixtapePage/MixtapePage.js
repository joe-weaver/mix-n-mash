import React from "react";
import { Card, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";

import "../Page.css";
import "./MixtapePageStyle.css";

export default class MixtapePage extends React.Component {
  constructor(props) {
    super(props);

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
              <Form.Check type="checkbox" label="Public " defaultValue="" />
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
                defaultValue={this.state.mixtape.title}
                disabled={!this.state.editingMixtapeTitle}
                maxLength="50"
              />
              <Link>{this.state.mixtape.owner.username}</Link>
            </div>
            <IconButton component={<CallMergeIcon />} />
            <IconButton component={<CallSplitIcon />} />
            <IconButton component={<GroupAddIcon />} />
          </Card.Header>}
          <div className="song-container"></div>
          <Card.Body></Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </div>
    );
  }
}
