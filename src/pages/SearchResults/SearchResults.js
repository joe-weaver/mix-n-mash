import React from "react";
import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import { Card } from "react-bootstrap";
import Dropdown from "../../components/Dropdown/Dropdown";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { userClient, queryUsers } from "../../services/userService";
import { mixtapesClient, queryMixtapes } from "../../services/mixtapesService";
import UserResultCard from "../../components/UserResultCard/UserResultCard";
import { useAuth } from "../../utils/use-auth";
import { useParams } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import "../Page.css";

const filterTypes = {
  Mixtapes: "Mixtapes",
  Users: "Users"
}

const items = [
  filterTypes.Mixtapes,
  filterTypes.Users
];

const limit = 10;

const SearchResults = (props) => {
  // Hook into the auth state
  const auth = useAuth();

  const history = useHistory();

  // Hook into the params
  const {criteria, filter, skip} = useParams();

  // Objects to catch search results
  let userObj = {loading: null, error: null, data: null, refetch: null};
  let mixtapeObj = {loading: null, error: null, data: null, refetch: null};

  // Query on page load the the params in the url
  userObj = useQuery(queryUsers, {client: userClient, variables: {searchTerm: criteria, skip: (skip ? parseInt(skip) : 0)*limit, limit: limit}});
  mixtapeObj = useQuery(queryMixtapes, {client: mixtapesClient, variables: {searchTerm: criteria, userId: auth.user._id, skip: (skip ? parseInt(skip) : 0)*limit, limit: limit}});
  
  const refreshResults = () => {
    if(filter === filterTypes.Users){
      userObj.refetch({searchTerm: criteria, skip: (skip ? parseInt(skip) : 0)*limit, limit: limit});
    } else {
      mixtapeObj.refetch({searchTerm: criteria, userId: auth.user._id, skip: (skip ? parseInt(skip) : 0)*limit, limit: limit});
    }
  }

  const handleFilter = (selection) => {
    const newSkip = (skip ? parseInt(skip) : 0);

    history.push("/SearchResults/" + criteria + "/" + selection + "/" + newSkip);
  }

  const getItems = () => {
    if(filter === filterTypes.Users){
      return userObj.data.queryUsers.map(user => ({data: user, isMixtape: false}));
    } else {
      return mixtapeObj.data.queryMixtapes.map(mixtape => ({data: mixtape, isMixtape: true}));
    }
  }
  
  const navigatePage = (increment) => {
    const newSkip = (skip ? parseInt(skip) : 0) + increment;

    history.push("/SearchResults/" + criteria + "/" + filter + "/" + newSkip);
  }
  
  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <div><h1>Search Results</h1>
              Searching for: {criteria}</div>
            <div>
              <Dropdown
                title="MyDropdown"
                items={items}
                selectionCallback={handleFilter}
                defaultIndex={0}
              />
              <IconButton
                component={<RefreshIcon />}
                callback={refreshResults}
              ></IconButton>
            </div>
          </Card.Header>
          <Card.Body className="scroll-content">
            {!mixtapeObj.loading && !userObj.loading && getItems().map(item => {
            if(item.isMixtape){
              return (<MixtapeResultCard mixtape={item.data} key={item.data._id} />);
            } else {
              return (<UserResultCard user={item.data} key={item.data._id}/>);
            }})}
          </Card.Body>
          <Card.Footer className="card-footer">
            <IconButton component={<ArrowBackIcon/>} disabled={skip ? (skip === 0) : true} onClick={() => navigatePage(-1)}></IconButton>
            <div>{skip ? skip : "0"}</div>
            <IconButton component={<ArrowForwardIcon/>} disabled={userObj.loading || mixtapeObj.loading || getItems().length < 10} onClick={() => navigatePage(1)}></IconButton>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default SearchResults;

