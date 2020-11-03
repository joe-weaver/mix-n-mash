import React from "react";
import { Card, Button, FormControl, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useHistory } from "react-router-dom";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import MashmateCard from "../../components/MashmateCard/MashmateCard";
import MashmateRequestCard from "../../components/MashmateRequestCard/MashmateRequestCard";

import "./AccountStyle.css";
import "../Page.css";

const Account = (props) => {
  let [editingBio, setEditingBio] = React.useState(false);
  let [editingPassword, setEditingPassword] = React.useState(false);
  //let {loading, error, data} = {loading: false, error: null, data: {username: "Test", bio: "Test bio", mixtapes: [], mashmates: [], receivedMashmateRequests: []}}//useQuery();

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const history = useHistory();

  const logOut = () => {
    window.sessionStorage.clear();
    history.push("/");
  }

  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks.ACCOUNT} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <h1>My Account</h1>
            <div>
              <Button className="mm-btn-alt" onClick={logOut}>Log Out</Button>
            </div>
          </Card.Header>
          <Card.Body className="scroll-content">
            {/*Bio stuff  */}
            <div className="field-title">
              {!editingBio && (
                <IconButton
                  component={<EditIcon />}
                  callback={() => setEditingBio(true)}
                />
              )}
              {editingBio && (
                <IconButton
                  component={<SaveIcon />}
                  callback={() => setEditingBio(false)}
                />
              )}
              <h5>Bio</h5>
            </div>
            <FormControl
              as="textarea"
              className="bio-textarea"
              defaultValue={user.bio}
              disabled={!editingBio}
              maxLength="255"
            />

            {/*Password stuff  */}
            <div className="field-title">
              {!editingPassword ? (
                <IconButton
                  component={<EditIcon />}
                  callback={() => setEditingPassword(false)}
                />
              ) : (<IconButton
                  component={<SaveIcon />}
                  callback={() => setEditingPassword(true)}
                />
              )}
              <h5>Password</h5>
            </div>
            {!editingPassword && (
              <Form.Control
                type="password"
                value={"Phony Password"}
                className="password-input"
                disabled
              />
            )}
            {editingPassword && (
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
              <div className="mashmatesList-container">
                Mashmates
                <IconButton component={<RefreshIcon />} />
                <div className="scroll-content" style={{maxHeight: "275px"}}>
                  {user.mashmates.map((mashmate) => (
                    <MashmateCard mashmate={mashmate} />
                  ))}
                </div>
              </div>
              <div className="filler">
                
              </div>
              <div className="mashmateRequests-container">
                Mashmate Requests
                <IconButton component={<RefreshIcon />} />
                <div className="scroll-content" style={{maxHeight: "275px"}}>
                  {user.receivedMashmateRequests.map((mashmateRequest) => (
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

export default Account;