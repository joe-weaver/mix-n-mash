import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Card } from "react-bootstrap";

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useQuery } from "@apollo/client";
import { mixtapesClient, getHottestMixtapes } from "../../services/mixtapesService";

import "../Page.css";

const items = [
  "Hottest Mixtapes Today",
  "Hottest Mixtapes This Week",
  "Hottest Mixtapes of All Time"
];

const sortFunctions = {
  "Hottest Mixtapes Today": (a, b) => b.listensPerDay[0] - a.listensPerDay[0],
  "Hottest Mixtapes This Week": (a, b) => {
    let aListens = 0;
    let bListens = 0;

    let i = 0;
    while(i < a.listensPerDay.length || i < 7){
      aListens += a.listensPerDay[i];
      i++;
    }

    i = 0;
    while(i < b.listensPerDay.length || i < 7){
      bListens += b.listensPerDay[i];
      i++;
    }

    return bListens - aListens;
  
  },
  "Hottest Mixtapes of All Time": (a, b) => b.listens - a.listens
}

const HottestMixtapes  = (props) => {
  let {loading, data, refetch} = useQuery(getHottestMixtapes, {client: mixtapesClient, pollInterval: 1000});
  const [dropdownState, setDropdownState] = React.useState("Hottest Mixtapes Today");

  if(!loading){
    var tempData = data.hottestMixtapes.slice();
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
                selectionCallback={setDropdownState}
              />
              <IconButton
                component={<RefreshIcon />}
                callback={() => refetch()}
              ></IconButton>
            </div>
          </Card.Header>
          <Card.Body className="scroll-content">
            {!loading && tempData.sort(sortFunctions[dropdownState]).map((hottestMixtape) => (
              <MixtapeResultCard mixtape={hottestMixtape} key={hottestMixtape._id} />
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HottestMixtapes;
