import React from "react";
import { Card, Button, FormControl } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useHistory } from "react-router-dom";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import MashmateCard from "../../components/MashmateCard/MashmateCard";
import MashmateRequestCard from "../../components/MashmateRequestCard/MashmateRequestCard";
import { useAuth } from "../../utils/use-auth";
import ChangePassword from "./Components/ChangePassword";

import "./AccountStyle.css";
import "../Page.css";

const Account = (props) => {
  // Hook into the auth state
  const auth = useAuth();

  let [editingBio, setEditingBio] = React.useState(false);

  const [user, setUser] = React.useState(auth.user);

  const refreshUser = () => {
    auth.getUser().then(userOrError => {
      if(!userOrError.error){
        // We don't have an error
        setUser(userOrError);
      }
    })
  }

  const history = useHistory();

  const logOut = () => {
    auth.logout().then(success => {
      if(success !== false){
        history.push("/");
      }
    });
  }

  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks.ACCOUNT} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <h1>{user.username}</h1>
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
            <ChangePassword />
            <br />
            {/*Mashmate stuff  */}
            <div className="mashmateStuff-container">
              <div className="mashmatesList-container">
                Mashmates
                <IconButton component={<RefreshIcon />} callback={() => refreshUser()} />
                <div className="scroll-content" style={{maxHeight: "275px"}}>
                  {user.mashmates.map((mashmate) => (
                    <MashmateCard mashmate={mashmate} key={mashmate.id} />
                  ))}
                </div>
              </div>
              <div className="filler">
                
              </div>
              <div className="mashmateRequests-container">
                Mashmate Requests
                <IconButton component={<RefreshIcon />} callback={() => refreshUser()} />
                <div className="scroll-content" style={{maxHeight: "275px"}}>
                  {user.receivedMashmateRequests.map((mashmateRequest) => (
                    <MashmateRequestCard mashmateRequest={mashmateRequest} key={mashmateRequest.senderId} />
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