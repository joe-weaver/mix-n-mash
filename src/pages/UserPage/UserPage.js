import React from "react";
import { Button } from "react-bootstrap";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useMutation, useQuery } from "@apollo/client";
import { useToast } from "../../utils/use-toast";

import Navbar from "../../components/Navbar/Navbar";
import { userClient, 
          getUser, 
          sendMMRequest as sendMMRequestMut,
          follow as followMut,
          incFollowersCount as incFollowersCountMut,
          unfollow as unfollowMut,
          decFollowersCount as decFollowersCountMut} from "../../services/userService";
import { mixtapesClient, getUserPageMixtapes } from "../../services/mixtapesService";
import { useParams } from "react-router-dom";

import { useAuth } from "../../utils/use-auth";

import "./UserPageStyle.css";

export default function UserPage(){
    
    const {userId} = useParams();

    const auth = useAuth();
  
    let {loading, data} = useQuery(getUser, {variables: {id: userId}, client: userClient});
    let mixtapeObj = {loading: null, error: null, data: null};
    
    mixtapeObj = useQuery(getUserPageMixtapes, {client: mixtapesClient, variables: {userId: auth.user._id, otherUserId: userId}});
    
    // Hook into notifications
    const toaster = useToast();
  
    const [sendMashmateRequestMutation] = useMutation(sendMMRequestMut, {client: userClient, onCompleted: (data) => {
      auth.getUser();
    }});
    const [followUserMutation]= useMutation(followMut, {client: userClient, onCompleted:() => auth.getUser()});
    const [incrementUserFollowCountMutation]= useMutation(incFollowersCountMut, {client: userClient});
    const [unfollowUserMutation]= useMutation(unfollowMut, {client: userClient, onCompleted:() => auth.getUser()});
    const [decrementUserFollowCountMutation]= useMutation(decFollowersCountMut, {client: userClient});
  
    const SendMashmateRequest = () => {
      const mashmateRequest = {
        senderId: auth.user._id,
        username: auth.user.username,
        seen: false
      };
  
      sendMashmateRequestMutation({variables: {
        id: data.user._id, 
        newMashmateRequest: mashmateRequest
      }});
  
      // Notify user
      toaster.notify("Request Sent", "You sent a mashmate request to " + data.user.username + ".");
    }
  
    const followUserFunct = () => {
      if (auth.user._id === data.user._id){toaster.notify("You cannot follow yourself!")}
      else if (auth.user.following.includes(data.user._id)){toaster.notify("You cannot follow this user again!")}
      else{
        followUserMutation({variables: {
          id: auth.user._id, 
          idToFollow: data.user._id
        }});
  
        incrementUserFollowCountMutation({variables: {
          id: data.user._id, 
        }});
      }
    }
  
    const unfollowUserFunct = () => {
      if (!(auth.user.following.includes(data.user._id))){toaster.notify("You cannot unfollow this user again!")}
      else{  
        unfollowUserMutation({variables: {
          id: auth.user._id, 
          idToUnfollow: data.user._id
        }});
  
        decrementUserFollowCountMutation({variables: {
          id: data.user._id, 
        }});
      }
    }

    return (
      <div className="mm-container scroll-screen">
        <Navbar currentPage={null} />
        <div className="user-container">
          <div className="username">{!loading && data.user.username}</div>
          {!loading && auth.user._id !== data.user._id &&
              <Button
              className="mm-btn"
              style={{marginTop: "2vh", marginLeft: "6vw"}}
              onClick={SendMashmateRequest}
              disabled={loading || data.user.mashmates.reduce((acc, x) => (auth.user._id === x.id) || acc, false)
                      || data.user.receivedMashmateRequests.reduce((acc, x) => (auth.user._id === x.senderId) || acc, false)}>
                  {data.user.receivedMashmateRequests.reduce((acc, x) => (auth.user._id === x.senderId) || acc, false) && "Mashmate Request Sent"}
                  {data.user.mashmates.reduce((acc, x) => (auth.user._id === x.id) || acc, false) && "Already mashmates"}
                  {!data.user.receivedMashmateRequests.reduce((acc, x) => (auth.user._id === x.senderId) || acc, false) && !data.user.mashmates.reduce((acc, x) => (auth.user._id === x.id) || acc, false) && "Send Mashmate Request"}
              </Button>
          }
          <h4 className="followers">
              {!loading && data.user.numFollowers} Follower{!loading && data.user.numFollowers !== 1 ? "s" : ""}
              {!auth.user.following.includes(userId) ? 
                  (<Button className="mm-btn" style={{marginLeft: "10vw"}} onClick={followUserFunct}>Follow</Button>) 
                  : 
                  (<Button className="mm-btn" style={{marginLeft: "10vw"}} onClick={unfollowUserFunct}>Unfollow</Button>)
              }
          </h4>
          {/* BIO STUFF */}
          <h3 style={{paddingLeft: "4vw", paddingTop: "4vh"}}>Bio:</h3>
          <div className="user-bio-container">{!loading && data.user.bio}</div>
          {/* MIXTAPES STUFF */}
          <div className="users-mixtapes-container">
              <h4 style={{paddingLeft: "2vw", paddingBottom: "2vw"}}>{!loading && data.user.username}'s Mixtapes</h4>
              {!mixtapeObj.loading && mixtapeObj.data.getUserPageMixtapes.reduce((acc, x) => [x, ...acc], []).map((mixtape, index) => (
                  <MixtapeResultCard mixtape={mixtape} index={index} key={mixtape._id} />
              ))}
          </div>
        </div>
      </div>
    );
}