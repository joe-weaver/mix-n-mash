import React from "react";
import { Button, FormControl } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import RefreshIcon from "@material-ui/icons/Refresh";
import { useHistory } from "react-router-dom";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import IconButton from "../../components/IconButton/IconButton";
import MashmateCard from "../../components/MashmateCard/MashmateCard";
import MashmateRequestCard from "../../components/MashmateRequestCard/MashmateRequestCard";
import { useAuth } from "../../utils/use-auth";
import { useToast } from "../../utils/use-toast";
import ChangePassword from "./Components/ChangePassword";
import { useQuery, useMutation } from "@apollo/client";
import {userClient, updateBio as updateBioMut, deactivateAccount as deactivateAccountMut, resolveMashmateRequest as resolveMMRequest, removeMashmate as removeMMMut} from "../../services/userService";
import {mixtapesClient, getUserMixtapes, updateOwnerActive as updateOwnerActiveMut} from "../../services/mixtapesService";

import DeactivateAccountModal from "../../components/Modals/DeactivateAccountModal";

import "./AccountStyle.css";

export default function Account(){
  // Hook into the auth state
  const auth = useAuth();

  const toaster = useToast();

  const {loading, data} = useQuery(getUserMixtapes, {client: mixtapesClient, variables:{userId: auth.user._id}});

  const [updateOwnerActiveMutation] = useMutation(updateOwnerActiveMut, {client: mixtapesClient});

  const [editingBio, setEditingBio] = React.useState(false);
  const [tempBio, setTempBio] = React.useState(auth.user.bio);

  const [updateBioMutation] = useMutation(updateBioMut, {client: userClient, onCompleted: ()=>{auth.getUser();}});
  const [deactivateAccountMutation] = useMutation(deactivateAccountMut, {client: userClient});
  const [resolveMMRequestMut] = useMutation(resolveMMRequest, {client: userClient, onCompleted: () => auth.getUser()});
  const [removeMMMutation] = useMutation(removeMMMut, {client: userClient, onCompleted: () => auth.getUser()});


  const updateBio = () => {
    // Bio is different
    if(tempBio !== auth.user.bio){
      updateBioMutation({variables: {id: auth.user._id, bio: tempBio}});
    }
    setEditingBio(false);
  }

  const cancelUpdateBio = () => {
    setTempBio(auth.user.bio);
    setEditingBio(false);
  }

  const refreshUser = () => {
    auth.getUser();
  }

  const history = useHistory();

  const logOut = () => {
    auth.logout().then(success => {
      if(success !== false){
        toaster.notify("Log Out", "You have been successfully logged out.");
        history.push("/");
        window.location.reload();
      }
    });
  }

  const resolveMMR = (id, username, accepted) => {
    resolveMMRequestMut({variables: {id: auth.user._id, username: auth.user.username, senderId: id, senderUsername: username, accepted: accepted}});
  }

  const removeMM = (id, username) => {
    removeMMMutation({variables: {id: auth.user._id, username: auth.user.username, mashmateId: id, mashmateUsername: username}});
  }

  const updateMixtapesOwnerActive = () => {
    data.getUserMixtapes.filter((mixtape) => mixtape.ownerId === auth.user._id)
    .forEach((mixtape)=>{updateOwnerActiveMutation({variables: {id: mixtape._id, ownerActive: false}})});
  }

  const deactivateAccount = () => {
    if(!loading){
      deactivateAccountMutation({variables: {id: auth.user._id}});
      updateMixtapesOwnerActive();
      auth.logout().then(success => {
        if(success !== false){
          toaster.notify("Account Deactivated", "Account successfully deactivated. We have to see you go :(");
          history.push("/");
        }
      });
    }
  }

  return (
    <div className="mm-container scroll-screen">
      <Navbar currentPage={NavbarLinks.ACCOUNT} />
      <h1 className="page-title">Account<Button className="mm-btn-warning" onClick={logOut}>Log Out</Button></h1>
      <div className="account-container">
        <div className="username">{auth.user.username}</div>
        <h4 className="followers">{auth.user.numFollowers} Follower{auth.user.numFollowers !== 1 ? "s" : ""}</h4>
        {/* BIO STUFF */}
        <h3 style={{paddingLeft: "4vw", paddingTop: "4vh"}}>Edit Bio:</h3>
        <div className="user-bio-container">
          <div className="edit-bio-buttons">
            {!editingBio && (
              <IconButton
                component={<EditIcon />}
                callback={() => setEditingBio(true)}
              />
            )}
            {editingBio && (
              <IconButton
                component={<SaveIcon />}
                callback={updateBio}
              />
            )}
            {editingBio && (
              <IconButton
                component={<NotInterestedIcon />}
                callback={() => cancelUpdateBio()}
              />
            )}
        </div>
        <FormControl
          as="textarea"
          className="user-bio"
          value={tempBio}
          disabled={!editingBio}
          maxLength="255"
          onChange={event => setTempBio(event.target.value)}
        />
        </div>
        {/* PASSWORD STUFF */}
        <h3 style={{paddingLeft: "4vw"}}>Change Password:</h3>
        <div className="password-container">
          <ChangePassword />
        </div>
        {/* MASHMATE STUFF */}
        <h3 style={{paddingLeft: "4vw", paddingTop: "4vh"}}>Mashmates:</h3>
        <div className="mashmate-info-container">
          <div className="mashmates">
            Mashmates
            <IconButton component={<RefreshIcon />} callback={() => refreshUser()} />
            <div className="scroll-content" style={{maxHeight: "275px"}}>
              {auth.user.mashmates.map((mashmate, index) => (
                <MashmateCard 
                  mashmate={mashmate} 
                  key={mashmate.id}
                  index={index}
                  remove={removeMM} />
              ))}
            </div>
          </div>
          <div className="mashmate-requests">
            Mashmate Requests
            <IconButton component={<RefreshIcon />} callback={() => refreshUser()} />
            <div className="scroll-content" style={{maxHeight: "275px"}}>
              {auth.user.receivedMashmateRequests.map((mashmateRequest, index) => (
                <MashmateRequestCard
                  mashmateRequest={mashmateRequest}
                  key={mashmateRequest.senderId}
                  index={index}
                  resolve={resolveMMR} />
              ))}
            </div>
          </div>
        </div>
        {/* ACCOUNT STUFF */}
        <h3 style={{paddingLeft: "4vw", paddingTop: "4vh"}}>Deactivate Account:</h3>
        <div style={{paddingLeft: "6vw", paddingBottom: "10vh"}}>
        <DeactivateAccountModal deactivateCallback={deactivateAccount} />
        </div>
      </div>
    </div>
  )
}