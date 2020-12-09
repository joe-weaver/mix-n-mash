import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavbarLinks } from "../../data/NavbarLinks";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useMutation, useQuery } from "@apollo/client";
import { ProvideToast } from "../../utils/use-toast";
import { formatDate } from "../../utils/DateUtils";

import Navbar from "../../components/Navbar/Navbar";
import { userClient, getUser, sendMMRequest as sendMMRequestMut} from "../../services/userService";
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
  
  //const toaster = useToast();
  const [sendMashmateRequestMutation] = useMutation(sendMMRequestMut, {client: userClient});

  const addSentRequests = () => {
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

    console.log("SENDING REQUEST");
  }

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
              <Button className="mm-btn-alt" onClick={addSentRequests}>Send Mashmate Request </Button>
              <Button className="mm-btn-alt">Follow</Button>
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
