import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import RefreshIcon from "@material-ui/icons/Refresh";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeCard from "../../components/MixtapeCard/MixtapeCard";


import { useQuery, useMutation } from "@apollo/client";
import { mixtapesClient, getUserMixtapes, createMixtape as createMixtapeMut} from "../../services/mixtapesService";

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

  let {loading, data, refetch} = useQuery(getUserMixtapes, {client: mixtapesClient, variables:{userId}});

  let [filterKey, setFilterKey] = useState("All Mixtapes");

  const filterFunctions = {
    "All Mixtapes": (mixtape) => true,
    "Owner": (mixtape) => mixtape.ownerId === userId,
    "Shared With Me": (mixtape) => mixtape.collaborators.reduce((acc, x) => x.userId === userId || acc, false),
    "Can Edit": (mixtape) => mixtape.collaborators.reduce((acc, x) => (x.userId === userId && x.privilegeLevel === "edit") || acc, false),
    "Can View": (mixtape) => mixtape.collaborators.reduce((acc, x) => (x.userId === userId && x.privilegeLevel === "view") || acc, false)
  }

  const [createMixtapeMutation] = useMutation(createMixtapeMut, {client: mixtapesClient});

  const createMixtape = () => {
    createMixtapeMutation({variables: {ownerId: user._id , ownerName: user.username}});
  }
  
  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks.MY_MIXTAPES} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <h1>My Mixtapes</h1>
            <div>
              <Button variant="primary" className="mm-btn-alt" onClick={createMixtape}>
                Create Mixtape
              </Button>
              <Dropdown
                title="MyDropdown"
                items={items}
                selectionCallback={(key) => setFilterKey(key)}
              />
              <IconButton
                component={<RefreshIcon />}
                callback={() => refetch()}
              ></IconButton>
            </div>
          </Card.Header>
          <Card.Body className="scroll-content">
            {!loading && data.getUserMixtapes.filter(filterFunctions[filterKey]).map((mixtape) => (
              <MixtapeCard mixtape={mixtape} key={mixtape._id} />
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MyMixtapes;