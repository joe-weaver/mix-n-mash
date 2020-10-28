import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavbarLinks } from "../../data/NavbarLinks";
import MixtapeResultCard from "../../components/MixtapeResultCard/MixtapeResultCard";

import Navbar from "../../components/Navbar/Navbar";

import "../Page.css";
import "./UserPageStyle.css";

export default class MixtapePage extends React.Component {
  constructor(props) {
    super(props);

    // Extract the id from the url
    let url = window.location.pathname.split("/");
    let id = parseInt(url[url.length - 1]);
    this.state = { id: id, loading: true };

    this.loadData();
  }

  loadData() {
    fetch("/TestData.json")
      .then(response => response.json())
      .then(jsonResponse => {
        let mixtapes = [];
        for(let m of jsonResponse.data){
          if(parseInt(m.ownerId) === this.state.id){
            mixtapes.push(m);
          }
        }

        let user = null;
        for(let u of jsonResponse.users){
          if(u._id === this.state.id){
            user = u;
          }
        }

        console.log(user);

        this.setState({loading: false, mixtapes: mixtapes, user: user})
      });
  }

  render() {
    return (
      <div>
        <div className="page-container">
          <Navbar currentPage={NavbarLinks} />
          <Card className="page-content">
            <Card.Header className="content-header">
              <h1>{!this.state.loading && this.state.user.username}</h1>
            </Card.Header>
            <Card.Body>

              {/*Bio stuff  */}
              <div className="user_top_body">
                {!this.state.loading && this.state.user.bio}
                <div className= "user_page_buttons">
                <Button className="mm-btn-alt">Send Mashmate Request</Button>
                <Button className="mm-btn-alt">Follow</Button>
                </div>
              </div>

              {/*List of their public mixtapes  */}
              <div className="users_mixtapes-container">
                <h4>{!this.state.loading && this.state.user.username}'s Mixtapes</h4>
                  
                <div className="scroll-content" style={{maxHeight: "275px"}}>
                {!this.state.loading && this.state.mixtapes.map((mixtape) => (
                <MixtapeResultCard mixtape={mixtape} />
              ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
