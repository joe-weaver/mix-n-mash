import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useQuery, useMutation } from "@apollo/client";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeCard from "../../components/MixtapeCard/MixtapeCard";
import { mixtapesClient, getUserMixtapes, createMixtape as createMixtapeMut} from "../../services/mixtapesService";
import { useAuth } from "../../utils/use-auth";
import { useToast } from "../../utils/use-toast";
import { useHistory } from "react-router-dom";

const items = [
  "All Mixtapes",
  "Owner",
  "Shared With Me",
  "Can Edit",
  "Can View"
];

const MyMixtapes = (props) => {
  // Hook into the auth
  const auth = useAuth();

  // Hook into notifications
  const toaster = useToast();

  // Hook into history
  const history = useHistory();

  let {loading, data, refetch} = useQuery(getUserMixtapes, {client: mixtapesClient, variables:{userId: auth.user._id}, pollInterval: 1000});

  let [filterKey, setFilterKey] = useState("All Mixtapes");

  const filterFunctions = {
    "All Mixtapes": (mixtape) => true,
    "Owner": (mixtape) => mixtape.ownerId === auth.user._id,
    "Shared With Me": (mixtape) => mixtape.collaborators.reduce((acc, x) => x.userId === auth.user._id || acc, false),
    "Can Edit": (mixtape) => mixtape.collaborators.reduce((acc, x) => (x.userId === auth.user._id && x.privilegeLevel === "edit") || acc, false),
    "Can View": (mixtape) => mixtape.collaborators.reduce((acc, x) => (x.userId === auth.user._id && x.privilegeLevel === "view") || acc, false)
  }

  const [createMixtapeMutation] = useMutation(createMixtapeMut, {client: mixtapesClient, onCompleted: (data) => {    
    // Extract new mixtape
    const mixtape = data.createNewMixtape;
    
    // Notify the user a mixtape was created
    toaster.notify("Mixtape Created", "You just created a new mixtape!")

    // Go to the new mixtape page
    history.push("/Mixtape/" + mixtape._id)
  }});

  const createMixtape = () => {
    createMixtapeMutation({variables: {ownerId: auth.user._id , ownerName: auth.user.username}});
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
              <MixtapeCard mixtape={mixtape} key={mixtape._id} refetchMyMixtapes={refetch}/>
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MyMixtapes;