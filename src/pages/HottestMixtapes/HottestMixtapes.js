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

const HottestMixtapes  = (props) => {
  //let {loading, error, data} = {loading: false, error: null, data: {mixtapes: []}}//useQuery();
  let {loading, error, data} = useQuery(getHottestMixtapes, {client: mixtapesClient});
  const [dropdownState, setDropdownState] = React.useState("Hottest Mixtapes Today");
  if(!loading){
    console.log("HEY!");
    console.log(data.hottestMixtapes[0]);   
    var tempData = data.hottestMixtapes.slice();
    console.log("TEMPDATA: \n" + tempData);
    console.log("\nDropdown State initial value: " + dropdownState);
  }

  function updateDropdown(e) {
    const item = e;
    console.log("\nITEM: "+ item);
    setDropdownState(dropdownState => item);
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
                selectionCallback={
                  (key) => {
                    console.log("Dropdown Key: " + key); 
                    setDropdownState(key);
                    console.log("Dropdown State: " + dropdownState);}
                }
                //callback={() => dropdownState.setDropdownState(items)}
                //onSelect={() => setDropdownState(items)}
                //callback={() => this.setState({ dropdownState: items })}
                
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
            {/*******************Hottest of today*******************/}
            {!loading && (dropdownState == "Hottest Mixtapes Today") && tempData.sort(function(a, b) {return b.listensPerDay[0] - a.listensPerDay[0];}).map((hottestMixtape) => (
              <MixtapeResultCard mixtape={hottestMixtape} />
            ))}

            {/*******************Hottest of last 7 days *******************/}
            {!loading && (dropdownState == "Hottest Mixtapes This Week") && tempData.sort(function(a, b) {
              var aListens = 0;
              var bListens = 0;
             {/*If both mixtapes have less than 7 listensPerDay values*/}
             if(b.listensPerDay.length < 7 && a.listensPerDay.length < 7){
              for(var i = 0; i < b.listensPerDay.length; i++){
                var bListens = bListens + b.listensPerDay[i];
              }
              for(var i = 0; i < a.listensPerDay.length; i++){
                var aListens = aListens + a.listensPerDay[i];
              }
              return bListens-aListens;
             }
             {/*If only b_mixtape has less than 7 listensPerDay values*/}
             if(b.listensPerDay.length < 7 && a.listensPerDay.length >= 7){
              for(var i = 0; i < b.listensPerDay.length; i++){
                var bListens = bListens + b.listensPerDay[i];
              }
              for(var i = 0; i < 7; i++){
                var aListens = aListens + a.listensPerDay[i];
              }
              return bListens-aListens;
             }
             {/*If only a_mixtape has less than 7 listensPerDay values*/}
             if(b.listensPerDay.length >= 7 && a.listensPerDay.length < 7){
              for(var i = 0; i < 7; i++){
                var bListens = bListens + b.listensPerDay[i];
              }
              for(var i = 0; i < a.listensPerDay.length; i++){
                var aListens = aListens + a.listensPerDay[i];
              }
              return bListens-aListens;
             }
             {/*If BOTH mixtapes have at least 7 listensPerDay values*/} 
              for(var i = 0; i < 7; i++){
                var bListens = bListens + b.listensPerDay[i];
              }
              for(var i = 0; i < 7; i++){
                var aListens = aListens + a.listensPerDay[i];
              }
              return bListens-aListens;
            
            }).map((hottestMixtape) => (<MixtapeResultCard mixtape={hottestMixtape} />))}
            
            {/*******************Hottest of all time *******************/}
            {!loading && (dropdownState == "Hottest Mixtapes of All Time") && tempData.sort(function(a, b) {return b.listens - a.listens;}).map((hottestMixtape) => (
              <MixtapeResultCard mixtape={hottestMixtape} />
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HottestMixtapes;
