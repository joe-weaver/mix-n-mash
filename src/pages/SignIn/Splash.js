import React from "react";
import { useHistory } from "react-router-dom";

import "./SignInStyle.css"

export default function Splash(props){
    const history = useHistory();

    return(
    <div className="mm-container single-screen splash-screen">
        <div className="logo-container">
            <img src="headphones w rainbow w text.svg" id="logo"/>
        </div>
        <div className="splash-btn-container">
            <div className="splash-btn" onClick={() => history.push("/login")}>Get Mashing</div>
        </div>
    </div>)
}