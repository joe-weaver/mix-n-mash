import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavbarLinks } from "../../data/NavbarLinks";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useQuery } from "@apollo/client";

import Navbar from "../../components/Navbar/Navbar";
import { userClient, getUsers } from "../../services/userService";

import "../Page.css";
import "./UserPageStyle.css";

const UserPage  = (props) => {
  let url = window.location.pathname.split("/");
  let idFromUrl = parseInt(url[url.length - 1]);
  let [id, setId] = React.useState(idFromUrl);

  let {loading, error, data} = useQuery(getUsers, {client: userClient, onCompleted: (data) => console.log(data)});

  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <h1>{!loading && data.username}</h1>
          </Card.Header>
          <Card.Body>

            {/*Bio stuff */}
            <div className="user-top-body">
              {!loading && data.bio}
              <div className= "user-page-buttons">
              <Button className="mm-btn-alt">Send Mashmate Request</Button>
              <Button className="mm-btn-alt">Follow</Button>
              </div>
            </div>

            {/*List of their public mixtapes  */}
            <div className="users-mixtapes-container">
              <h4>{!loading && data.username}'s Mixtapes</h4>
                
              <div className="scroll-content" style={{height: "90%"}}>
              {!true && data.mixtapes.map((mixtape) => (
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
