import React from "react";
import {Navbar, Nav, Form, FormControl} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import { NavbarLinks } from "../../data/NavbarLinks";

import "./NavbarStyle.css";

const SiteNavbar = (props) => {

  const history = useHistory();

  let [searchTerm, setSearchTerm] = React.useState("");

  const doSearch = () => {
    history.push("/SearchResults?search=" + searchTerm);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    doSearch();
  }

  const page = props.currentPage;

  return (
    <Navbar bg="dark" variant="dark" className="navbar-style">
      <Link to="/" className="navbar-brand">
        Mix n Mash
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Form inline onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2 mm-search"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Form>
          <IconButton
                  component={<SearchIcon />}
                  callback={doSearch}
                />
          <Link
            to="/HottestMixtapes"
            className={
              "nav-link" +
              (page === NavbarLinks.HOTTEST_MIXTAPES ? " selected" : "")
            }
          >
            Hottest Mixtapes
          </Link>
          <Link
            to="/MyMixtapes"
            className={
              "nav-link" +
              (page === NavbarLinks.MY_MIXTAPES ? " selected" : "")
            }
          >
            My Mixtapes
          </Link>
          <Link
            to="/Account"
            className={
              "nav-link" + (page === NavbarLinks.ACCOUNT ? " selected" : "")
            }
          >
            RyzonX's Account
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SiteNavbar;