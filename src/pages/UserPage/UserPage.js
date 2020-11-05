import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavbarLinks } from "../../data/NavbarLinks";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useQuery } from "@apollo/client";

import Navbar from "../../components/Navbar/Navbar";
import { userClient, getUser } from "../../services/userService";
import { mixtapesClient, getUserMixtapes } from "../../services/mixtapesService";

import "../Page.css";
import "./UserPageStyle.css";

const UserPage  = (props) => {
  let url = window.location.pathname.split("/");
  let idFromUrl = url[url.length - 1];

  let {loading, error, data} = useQuery(getUser, {variables: {id: idFromUrl}, client: userClient});
  let mixtapeObj = {loading: null, error: null, data: null};
  mixtapeObj = useQuery(getUserMixtapes, {client: mixtapesClient, variables: {userId: idFromUrl}, onCompleted: (data) => console.log(data)});

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
              <Button className="mm-btn-alt">Send Mashmate Request</Button>
              <Button className="mm-btn-alt">Follow</Button>
              </div>
            </div>

            {/*List of their public mixtapes  */}
            <div className="users-mixtapes-container">
              <h4>{!loading && data.user.username}'s Mixtapes</h4>
                
              <div className="scroll-content" style={{height: "90%"}}>
              {!mixtapeObj.loading && mixtapeObj.data.getUserMixtapes.map((mixtape) => (
              <MixtapeResultCard mixtape={mixtape} />
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
