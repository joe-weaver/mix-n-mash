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

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    // Extract the id from the url
    let url = window.location.pathname.split("/results?search_query=");
    let id = parseInt(url[url.length - 1]);
    this.state = { id: id, loading: true };

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

