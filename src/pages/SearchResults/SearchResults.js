import React from "react";
import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../Navbar";
import { Card, Button } from "react-bootstrap";
import Dropdown from "../../components/Dropdown/Dropdown";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "../../components/IconButton/IconButton";

import "./Page.css";

const items = [
  "Hottest Mixtapes Today",
  "Hottest Mixtapes This Week",
  "Hottest Mixtapes of All Time"
];

export default class SearchResults extends React.Component {
  render() {
    return (
      <div>
        <div className="page-container">
          <Card className="page-content">
            <Card.Header className="content-header">
              <h1>Search Results</h1>
              <div>
                <Dropdown
                  title="MyDropdown"
                  items={items}
                  selectionCallback={(key) => console.log(key)}
                />

                <IconButton component={<RefreshIcon />}></IconButton>
              </div>
            </Card.Header>
          </Card>
        </div>
      </div>
    );
  }
}
