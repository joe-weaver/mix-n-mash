import React from "react";
import { Card } from "react-bootstrap";
import RefreshIcon from "@material-ui/icons/Refresh";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeCard from "../../components/MixtapeCard/MixtapeCard";

const items = [
  "All Mixtapes",
  "Owner",
  "Shared With Me",
  "Can Edit",
  "Can View"
];

export default class MyMixtapes extends React.Component {
  constructor() {
    super();
    this.state = { userId: 1, mixtapes: [], loading: false };

    this.loadData();
  }

  loadData = () => {
    fetch("/TestData.json")
      .then(response => response.json())
      .then(jsonResponse => {
        let mixtapes = null;
        for(let u of jsonResponse.users){
          if(parseInt(u._id) === this.state.userId){
            mixtapes = u.mixtapes;
          }
        }
        this.setState({ mixtapes: mixtapes, loading: false })
      });
  };

  render() {
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
              {!this.state.loading && this.state.mixtapes.map((mixtape) => (
                <MixtapeCard mixtape={mixtape} />
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
