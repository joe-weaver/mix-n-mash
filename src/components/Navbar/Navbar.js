import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { NavbarLinks } from "../../data/NavbarLinks";

import "./NavbarStyle.css";

export default function Navbar(props){
    const history = useHistory();

    const [searchTerm, setSearchTerm] = React.useState("");
    const [scrollPastZero, setScrollPastZero] = React.useState(false);

    const checkScroll = () => {
        setScrollPastZero(window.pageYOffset > 0);
    }

    React.useEffect(() => {
        // Add scroll event
        window.addEventListener('scroll', checkScroll, {passive: true});

        // When component unmounts, remove the event listener
        return () => {
            window.removeEventListener('scroll', checkScroll);
        }
    })


    const doSearch = () => {
        if(searchTerm !== ""){
            history.push("/SearchResults/" + searchTerm + "/Mixtapes");
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        doSearch();
    }

    return (
        <ul id="navbar" className={scrollPastZero ? "detached" : ""}>
            <li id="searchbar-item">
            <Form inline id="search-form" onSubmit={handleSearch}>
                <SearchIcon id="search-icon"/>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    id="searchbar"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </Form>
            </li>
            <li
                className={"nav-item" + (props.currentPage === NavbarLinks.HOTTEST_MIXTAPES ? " selected": "")}
                onClick={() => history.push("/HottestMixtapes")}    >
                <div>Hottest Mixtapes</div>
            </li>
            <li
                className={"nav-item" + (props.currentPage === NavbarLinks.MY_MIXTAPES ? " selected": "")}
                onClick={() => history.push("/MyMixtapes")}    >
                <div>My Mixtapes</div>
            </li>
            <li
                className={"nav-item" + (props.currentPage === NavbarLinks.ACCOUNT ? " selected": "")}
                onClick={() => history.push("/Account")}>
                <div>Account</div>
            </li>
            <img src="navbar-logo.svg" id="navbar-logo" className={scrollPastZero ? "scrolled" : ""}></img>
        </ul>
    )
}