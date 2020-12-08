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
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useAuth } from "../../utils/use-auth";

import "../Page.css";

const items = [
  "Hottest Mixtapes Today",
  "Hottest Mixtapes This Week",
  "Hottest Mixtapes of All Time"
];

const sortCriteria = {
  "Hottest Mixtapes Today": "day",
  "Hottest Mixtapes This Week": "week",
  "Hottest Mixtapes of All Time": "allTime"
}

const HottestMixtapes  = (props) => {
  // Hook into the auth state
  const auth = useAuth();

  // Hook into browser history (for navigating)
  const history = useHistory();

  const {criteria, skip} = useParams();

  let {loading, data, refetch} = useQuery(getHottestMixtapes, {client: mixtapesClient, variables: {userId: auth.user._id, criteria: (criteria ? criteria : "day"), skip: (skip ? parseInt(skip) : 0) * 10, limit: 10}, pollInterval: 1000});

  const handleChangeCriteria = (selection) => {
    const newCriteria = sortCriteria[selection];
    const newSkip = skip ? skip : 0;

    history.push("/HottestMixtapes/" + newCriteria + "/" + newSkip);
  }

  const navigatePage = (increment) => {
    const newCriteria = criteria ? criteria : "today";
    let newSkip = (skip ? parseInt(skip) : 0) + increment;
    if(newSkip < 0){
      newSkip = 0;
    }

    history.push("/HottestMixtapes/" + newCriteria + "/" + newSkip);
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
                selectionCallback={handleChangeCriteria}
              />
              <IconButton
                component={<RefreshIcon />}
                callback={() => refetch()}
              ></IconButton>
            </div>
          </Card.Header>
          <Card.Body className="scroll-content">
            {!loading && data.hottestMixtapes.map((hottestMixtape) => (
              <MixtapeResultCard mixtape={hottestMixtape} key={hottestMixtape._id} />
            ))}
          </Card.Body>
          <Card.Footer className="card-footer">
            <IconButton component={<ArrowBackIcon/>} disabled={skip ? parseInt(skip) === 0 : true} onClick={() => navigatePage(-1)}></IconButton>
            <div>{skip ? skip : "0"}</div>
            <IconButton component={<ArrowForwardIcon/>} disabled={loading || data.hottestMixtapes.length < 10} onClick={() => navigatePage(1)}></IconButton>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default HottestMixtapes;
