import React from "react";
import {Navbar, Nav, Form, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import { NavbarLinks } from "../../data/NavbarLinks";

import "./NavbarStyle.css";
  
const searchTerm = "";

export default class SiteNavbar extends React.Component {
  handleSearch = (event) => {
    event.preventDefault();
    console.log(searchTerm);
  }

  render() {
    let page = this.props.currentPage;
    
    return (
      <Navbar bg="dark" variant="dark" className="navbar-style">
        <Link to="/" className="navbar-brand">
          Mix n Mash
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Form inline onSubmit={this.handleSearch}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 mm-search"

                //onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Form>
            <Link to="/SearchResults">
            <IconButton
                    component={<SearchIcon />}
                    callback={() => this.setState({ editingBio: false })}
                  />
            </Link>
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


}
