import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Card } from "react-bootstrap";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useQuery } from "@apollo/client";
import { hottestMixtapesClient, getHottestMixtapes } from "../../services/hottestMixtapesService";

import "../Page.css";


const items = [
  "Hottest Mixtapes Today",
  "Hottest Mixtapes This Week",
  "Hottest Mixtapes of All Time"
];

const HottestMixtapes  = (props) => {
  //let {loading, error, data} = {loading: false, error: null, data: {mixtapes: []}}//useQuery();
  let {loading, error, data} = useQuery(getHottestMixtapes, {client: hottestMixtapesClient});
  if(!loading){
    console.log("HEY!");
    console.log(data.hottestMixtapes[0]);    
  }
  
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
            {!loading && data.hottestMixtapes.map((hottestMixtape) => (
              <MixtapeResultCard mixtape={hottestMixtape} />
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HottestMixtapes;
