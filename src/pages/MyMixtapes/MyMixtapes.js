import React from "react";
import { Card } from "react-bootstrap";
import RefreshIcon from "@material-ui/icons/Refresh";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeCard from "../../components/MixtapeCard/MixtapeCard";

import { useQuery } from "@apollo/client";
import { mixtapesClient, getUserMixtapes } from "../../services/mixtapesService";

const items = [
  "All Mixtapes",
  "Owner",
  "Shared With Me",
  "Can Edit",
  "Can View"
];

const MyMixtapes = (props) => {

  let user = JSON.parse(window.sessionStorage.getItem("user"));

  let userId = user._id;

  let {loading, error, data} = useQuery(getUserMixtapes,{client: mixtapesClient, variables:{userId}});

  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks.MY_MIXTAPES} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <h1>My Mixtapes</h1>
            <div>
              <Dropdown
                title="MyDropdown"
                items={items}
                selectionCallback={(key) => console.log(key)}
              />
              <IconButton
                component={<RefreshIcon />}
                callback={() => {console.log("Refresh")}}
              ></IconButton>
            </div>
          </Card.Header>
          <Card.Body className="scroll-content">
            {!loading && data.getUserMixtapes.map((mixtape) => (
              <MixtapeCard mixtape={mixtape} />
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MyMixtapes;