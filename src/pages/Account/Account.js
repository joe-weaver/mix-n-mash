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

const mashmates = [
  { mashmateId: 10558001, username: "The McKillaGorilla" },
  { mashmateId: 10614770, username: "TheRealKevinMcDonnell" },
  { mashmateId: 10111736, username: "Dat one T.A." },
  { mashmateId: 10001235, username: "Filler Friend 1" },
  { mashmateId: 10001236, username: "Filler Friend 2" },
  { mashmateId: 10001237, username: "Loooooooong Friend Name" }
];
const mashmateRequests = [
  {
    senderId: 10558963,
    reciepientId: 10023581,
    username: "Joe",
    timeSent: 1234698172634,
    seen: false
  },
  {
    senderId: 10590963,
    reciepientId: 10023581,
    username: "Bernie",
    timeSent: 1901698172634,
    seen: true
  },
  {
    senderId: 17568964,
    reciepientId: 10023581,
    username: "LoooongName",
    timeSent: 1534698172634,
    seen: true
  },
  {
    senderId: 10001234,
    reciepientId: 10023581,
    username: "Filler Request 1",
    timeSent: 1594698172634,
    seen: false
  },
  {
    senderId: 10001234,
    reciepientId: 10023581,
    username: "Filler Request 2",
    timeSent: 1594698172634,
    seen: false
  },
  {
    senderId: 10001234,
    reciepientId: 10023581,
    username: "Filler Request 3",
    timeSent: 1594698172630,
    seen: false
  },
  {
    senderId: 10001234,
    reciepientId: 10023581,
    username: "Filler Request 4",
    timeSent: 1594698172634,
    seen: false
  },
  {
    senderId: 10001234,
    reciepientId: 10023581,
    username: "Filler Request 5",
    timeSent: 1594698172634,
    seen: false
  },
  {
    senderId: 10001234,
    reciepientId: 10023581,
    username: "Filler Request 6",
    timeSent: 1594698172634,
    seen: false
  }
];

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingBio: false,
      editingPassword: false,
      mashmates: [],
      mashmateRequests: []
    };
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
            <Card.Body>
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
                defaultValue="This is your user-page's description. Max amount of characters are 255."
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
                    {mashmates.map((mashmate) => (
                      <MashmateCard mashmate={mashmate} />
                    ))}
                  </div>
                </div>

                <div>
                  Mashmate Requests
                  <IconButton component={<RefreshIcon />} />
                  <div className="scroll-content" style={{maxHeight: "275px"}}>
                    {mashmateRequests.map((mashmateRequest) => (
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
