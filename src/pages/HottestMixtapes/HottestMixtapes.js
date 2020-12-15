import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Spinner } from 'react-bootstrap';

import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useQuery } from "@apollo/client";
import { mixtapesClient, getHottestMixtapes } from "../../services/mixtapesService";
import { useHistory, useParams, Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useAuth } from "../../utils/use-auth";

import "./HottestMixtapesStyle.css";

const items = [
  "Hottest Mixtapes Today",
  "Hottest Mixtapes This Week",
  "Hottest Mixtapes of All Time",
  "Follower Mixtapes Today",
  "Follower Mixtapes This Week",
  "Follower Mixtapes of All Time",
];

const sortCriteria = {
  "Hottest Mixtapes Today": "day",
  "Hottest Mixtapes This Week": "week",
  "Hottest Mixtapes of All Time": "allTime",
  "Follower Mixtapes Today": "dayFollowers",
  "Follower Mixtapes This Week": "weekFollowers",
  "Follower Mixtapes of All Time": "allTimeFollowers",
}

const HottestMixtapes  = (props) => {
  // Hook into the auth state
  const auth = useAuth();

  // Hook into browser history (for navigating)
  const history = useHistory();

  const {criteria, skip} = useParams();

  let {loading, data, refetch} = useQuery(getHottestMixtapes, {client: mixtapesClient, variables: {userId: auth.user._id, criteria: (criteria ? criteria : "day"), skip: (skip ? parseInt(skip) : 0) * 10, limit: 10, following: auth.user.following, genrePreferences: auth.user.genrePreferences.map(x=>({genre: x.genre, val: x.val}))}, pollInterval: 1000});

  const handleChangeCriteria = (selection) => {
    const newCriteria = sortCriteria[selection];
    history.push("/HottestMixtapes/" + newCriteria + "/0");
  }

  const navigatePage = (increment) => {
    const newCriteria = criteria ? criteria : "day";
    let newSkip = (skip ? parseInt(skip) : 0) + increment;
    if(newSkip < 0){
      newSkip = 0;
    }

    history.push("/HottestMixtapes/" + newCriteria + "/" + newSkip);
  }

  return (
    <div className="mm-container scroll-screen">
      <Navbar currentPage={NavbarLinks.HOTTEST_MIXTAPES} />
      <h1 className="page-title">Hottest Mixtapes
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
      </h1>
      <div id="mixtape-list">
        {loading && (
          <div className="loading">
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {!loading && data.hottestMixtapes.map((mixtape, index) => (
          <MixtapeResultCard mixtape={mixtape} index={index}/>
        ))}
      </div>
      <div className="page-navigator">
        <IconButton component={<ArrowBackIcon/>} disabled={skip ? parseInt(skip) === 0 : true} onClick={() => navigatePage(-1)}></IconButton>
          <div>{skip ? skip : "0"}</div>
        <IconButton component={<ArrowForwardIcon/>} disabled={loading || data.hottestMixtapes.length < 10} onClick={() => navigatePage(1)}></IconButton>
      </div>
    </div>
  );
}

export default HottestMixtapes;
