import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavbarLinks } from "../../data/NavbarLinks";
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

import { useAuth } from "../../utils/use-auth";

import "../Page.css";
import "./UserPageStyle.css";

const UserPage  = (props) => {
  let url = window.location.pathname.split("/");
  let idFromUrl = url[url.length - 1];
  const auth = useAuth();

  let {loading, data} = useQuery(getUser, {variables: {id: idFromUrl}, client: userClient});
  let mixtapeObj = {loading: null, error: null, data: null};
  
  mixtapeObj = useQuery(getUserPageMixtapes, {client: mixtapesClient, variables: {userId: auth.user._id, otherUserId: idFromUrl}});
  
  // Hook into notifications
  const toaster = useToast();

  const [sendMashmateRequestMutation] = useMutation(sendMMRequestMut, {client: userClient});
  const [followUserMutation]= useMutation(followMut, {client: userClient, onCompleted:() => auth.getUser()});
  const [incrementUserFollowCountMutation]= useMutation(incFollowersCountMut, {client: userClient});
  const [unfollowUserMutation]= useMutation(unfollowMut, {client: userClient, onCompleted:() => auth.getUser()});
  const [decrementUserFollowCountMutation]= useMutation(decFollowersCountMut, {client: userClient});

  //const [showUnfollow, setShowUnfollow] = React.useState(null);

  const SendMashmateRequest = () => {
    if (auth.user._id === data.user._id){toaster.notify("You cannot add yourself!")}
    else if (data.user.receivedMashmateRequests.reduce((acc, x) => data.user._id === x.senderId || acc, false)){toaster.notify("You already sent a Mashmate Request!")}
    else if (data.user.mashmates.reduce((acc, x) => data.user._id === x.id || acc, false)){toaster.notify("You are already mashmates with this user!")}
    else{
      const mashmateRequest = {
        senderId: data.user._id,
        recipientId: auth.user._id,
        username: auth.user.username,
        //timeSent: Date.now(),
        seen: false
      };
  
      sendMashmateRequestMutation({variables: {
        id: data.user._id, 
        newMashmateRequest: mashmateRequest
      }});
    }
    
  }

  const followUserFunct = () => {
    if (auth.user._id === data.user._id){toaster.notify("You cannot follow yourself!")}
    else if (auth.user.following.includes(data.user._id)){toaster.notify("You cannot follow this user again!")}
    else{
      console.log("Following User")
      //setShowUnfollow(true);

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
      console.log("Unfollowing User")
      //setShowUnfollow(false);

      unfollowUserMutation({variables: {
        id: auth.user._id, 
        idToUnfollow: data.user._id
      }});

      decrementUserFollowCountMutation({variables: {
        id: data.user._id, 
      }});
    }
  }
  const checkAlreadyFollowed = () => {
    if (!loading){
      if (auth.user.following.includes(data.user._id)){return true}
      else{
        return false;
      }
      
    }
  }
  
  // if (!loading && showUnfollow==null){
  //   setShowUnfollow(checkAlreadyFollowed())
  // }



  return (
    
      
    
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <h1>{!loading && data.user.username}</h1>
          </Card.Header>
          <Card.Body>

            {/*Bio stuff */}
            <div className="user-top-body">
              {!loading && data.user.bio}
              <div className= "user-page-buttons">
                <Button className="mm-btn-alt" onClick={SendMashmateRequest}>Send Mashmate Request </Button>

               
                

                {!auth.user.following.includes(idFromUrl) ? 
                (<Button className="mm-btn-alt"onClick={followUserFunct}>Follow</Button>) 
                : 
                (<Button className="mm-btn-alt"onClick={unfollowUserFunct}>Unfollow</Button>)
                }

              </div>
            </div>

            {/*List of their public mixtapes  */}
            <div className="users-mixtapes-container">
              <h4>{!loading && data.user.username}'s Mixtapes</h4>
                
              <div className="scroll-content" style={{height: "90%"}}>
              {!mixtapeObj.loading && mixtapeObj.data.getUserPageMixtapes.map((mixtape) => (
              <MixtapeResultCard mixtape={mixtape} key={mixtape._id} />
            ))}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default UserPage;
