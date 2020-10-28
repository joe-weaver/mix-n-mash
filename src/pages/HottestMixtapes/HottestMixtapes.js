import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Card } from "react-bootstrap";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";

import "../Page.css";

const items = [
  "Hottest Mixtapes Today",
  "Hottest Mixtapes This Week",
  "Hottest Mixtapes of All Time"
];

export default class HottestMixtapes extends React.Component {
  constructor() {
    super();
    this.state = { mixtapes: [], loading: true };

    this.loadData();
  }

  loadData = () => {
    fetch("/TestData.json")
      .then(response => {return response.json();})
      .then(jsonResponse => this.setState({ mixtapes: jsonResponse.data, loading: false }));
  };

  render() {
    return (
      <div>
        <div className="page-container">
          <Navbar currentPage={NavbarLinks.HOTTEST_MIXTAPES} />
          <Card className="page-content">
            <Card.Header className="content-header">
              <h1>Hottest Mixtapes</h1>
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
                {/*May need another smaller dropdown for sorting
                and Filter Hyperlink that opens up a modal with checkboxes 
                
                Both located below Hottest Dropdown and Refresh-button*/}
              </div>
            </Card.Header>
            <Card.Body className="scroll-content">
              {!this.state.loading && this.state.mixtapes.map((mixtape) => (
                <MixtapeResultCard mixtape={mixtape} />
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
