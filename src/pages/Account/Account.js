import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, FormControl, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import RefreshIcon from "@material-ui/icons/Refresh";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import MashmateCard from "../../components/MashmateCard/MashmateCard";
import MashmateRequestCard from "../../components/MashmateRequestCard/MashmateRequestCard";

import "./AccountStyle.css";
import "../Page.css";

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingBio: false,
      editingPassword: false,
      loading: true
    };

    this.loadData();
  }

  loadData(){
    fetch("/TestData.json")
      .then(response => {return response.json();})
      .then(jsonResponse => {
        let user = null;

        for(let u of jsonResponse.users){
          if(u._id === 1){
            user = u;
          }
        }
        console.log(user);
        this.setState({ user: user, loading: false })
      });
  }

  render() {
    return (
      <div>
        <div className="page-container">
          <Navbar currentPage={NavbarLinks.ACCOUNT} />
          <Card className="page-content">
            <Card.Header className="content-header">
              <h1>My Account</h1>
              <div>
                <Link to="/">
                  <Button className="mm-btn-alt">Log Out</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="scroll-content">
              {/*Bio stuff  */}
              <div className="field-title">
                {!this.state.editingBio && (
                  <IconButton
                    component={<EditIcon />}
                    callback={() => this.setState({ editingBio: true })}
                  />
                )}
                {this.state.editingBio && (
                  <IconButton
                    component={<SaveIcon />}
                    callback={() => this.setState({ editingBio: false })}
                  />
                )}
                <h5>Bio</h5>
              </div>
              <FormControl
                as="textarea"
                className="bio-textarea"
                defaultValue={this.state.loading ? "" : this.state.user.bio}
                disabled={!this.state.editingBio}
                maxLength="255"
              />

              {/*Password stuff  */}
              <div className="field-title">
                {!this.state.editingPassword && (
                  <IconButton
                    component={<EditIcon />}
                    callback={() => this.setState({ editingPassword: true })}
                  />
                )}
                {this.state.editingPassword && (
                  <IconButton
                    component={<SaveIcon />}
                    callback={() => this.setState({ editingPassword: false })}
                  />
                )}
                <h5>Password</h5>
              </div>
              {!this.state.editingPassword && (
                <Form.Control
                  type="password"
                  value={"Phony Password"}
                  className="password-input"
                  disabled
                />
              )}
              {this.state.editingPassword && (
                <>
                  <Form.Control type="password" placeholder="New Password" />
                  <br />
                  <Form.Control
                    type="password"
                    placeholder="Confirm New Password"
                  />
                </>
              )}
              <br />
              {/*Mashmate stuff  */}
              <div className="mashmateStuff-container">
                <div>
                  Mashmates
                  <IconButton component={<RefreshIcon />} />
                  <div className="scroll-content" style={{maxHeight: "275px"}}>
                    {!this.state.loading && this.state.user.mashmates.map((mashmate) => (
                      <MashmateCard mashmate={mashmate} />
                    ))}
                  </div>
                </div>

                <div>
                  Mashmate Requests
                  <IconButton component={<RefreshIcon />} />
                  <div className="scroll-content" style={{maxHeight: "275px"}}>
                    {!this.state.loading && this.state.user.receivedMashmateRequests.map((mashmateRequest) => (
                      <MashmateRequestCard mashmateRequest={mashmateRequest} />
                    ))}
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button className="mm-btn-warning">Deactivate Account</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}
