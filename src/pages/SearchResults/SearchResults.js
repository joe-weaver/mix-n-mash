import React from "react";
import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import { Card } from "react-bootstrap";
import Dropdown from "../../components/Dropdown/Dropdown";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";

import "../Page.css";

const items = [
  "Mixtapes",
  "Users",
  "Any"
];

const SearchResults = (props) => {
  // Extract the id from the url
  let url = window.location.pathname.split("/results?search_query=");
  console.log(url);
  let {loading, error, data} = {loading: false, error: null, data: {username: "Test", bio: "", mixtapes: []}}//useQuery();

  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <div><h1>Search Results</h1>
            Searching for: </div>
            <div>
              <Dropdown
                title="MyDropdown"
                items={items}
                selectionCallback={(key) => console.log(key)}
              />
              <IconButton
                component={<RefreshIcon />}
                callback={() => console.log("Refresh")}
              ></IconButton>
            </div>
          </Card.Header>
          <Card.Body className="scroll-content">
            {!loading && data.mixtapes.map((mixtape) => (
              <MixtapeResultCard mixtape={mixtape} />
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default SearchResults;

