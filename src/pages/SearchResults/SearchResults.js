import React from "react";
import { NavbarLinks } from "../../data/NavbarLinks";
import Navbar from "../../components/Navbar/Navbar";
import { Card } from "react-bootstrap";
import Dropdown from "../../components/Dropdown/Dropdown";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "../../components/IconButton/IconButton";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";
import { useLocation } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { userClient, queryUsers } from "../../services/userService";
import { mixtapesClient, queryMixtapes } from "../../services/mixtapesService";
import UserResultCard from "../../components/UserResultCard/UserResultCard";

import "../Page.css";

const filterTypes = {
  Mixtapes: "Mixtapes",
  Users: "Users",
  Any: "Any"
}

const items = [
  filterTypes.Mixtapes,
  filterTypes.Users,
  filterTypes.Any
];

const SearchResults = (props) => {
  // Extract the id from the url
  const query = useURLQuery();

  const searchTerm = query.get("search");

  // Objects to catch search results
  let userObj = {loading: null, error: null, data: null};
  let mixtapeObj = {loading: null, error: null, data: null};

  // Query on page load the the params in the url
  userObj = useQuery(queryUsers, {client: userClient, variables: {searchTerm}});
  mixtapeObj = useQuery(queryMixtapes, {client: mixtapesClient, variables: {searchTerm}});

  // Functions to refresh search results without page reload
  const [refreshUserObj, {}] = useLazyQuery(queryUsers, {client: userClient, variables: {searchTerm}});
  const [refreshMixtapeObj, {}] = useLazyQuery(queryMixtapes, {client: mixtapesClient, variables: {searchTerm}});

  const refreshResults = () => {
    refreshUserObj({onComplete: (data) => userObj.data = data});
    refreshMixtapeObj({onComplete: (data) => mixtapeObj.data = data});
  }

  const [filterKey, setFilterKey] = React.useState("Any");

  const getItems = () => {
    let res = [];
    if(filterKey === filterTypes.Mixtapes || filterKey === filterTypes.Any) {
      res.push(...mixtapeObj.data.queryMixtapes.map(mixtape => ({data: mixtape, isMixtape: true})));
    }

    if(filterKey === filterTypes.Users || filterKey === filterTypes.Any) {
      res.push(...userObj.data.queryUsers.map(user => ({data: user, isMixtape: false})));
    }

    return res;
  }
  
  return (
    <div>
      <div className="page-container">
        <Navbar currentPage={NavbarLinks} />
        <Card className="page-content">
          <Card.Header className="content-header">
            <div><h1>Search Results</h1>
              Searching for: {searchTerm}</div>
            <div>
              <Dropdown
                title="MyDropdown"
                items={items}
                selectionCallback={setFilterKey}
                defaultIndex={2}
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
              return (<MixtapeResultCard mixtape={item.data} />);
            } else {
              return (<UserResultCard user={item.data}/>);
            }})}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

const useURLQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export default SearchResults;

