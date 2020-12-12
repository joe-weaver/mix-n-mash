import React from "react";
import { Card, Button } from "react-bootstrap";

import LoginForm from "./Components/LoginForm"
import SignUpForm from "./Components/SignUpForm";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";

import "./SignInStyle.css"

export default function SignIn(props){
  let [forgotPassword, setForgotPassword] = React.useState(false);
  let [signup, setSignup] = React.useState(false);

  return(
  <div className="mm-container single-screen splash-screen">
    <div className="logo-container slide-left">
        <img src={require("../../images/headphones w rainbow w text.svg")} id="logo"/>
    </div>
    <div className="login-container">
      <Card className="login-card fade-in">
        {!forgotPassword && !signup && <LoginForm setForgotPassword={setForgotPassword} setSignup={setSignup}/>}
        {forgotPassword && <ForgotPasswordForm setForgotPassword={setForgotPassword} />}
        {signup && <SignUpForm exitSignUp={() => setSignup(false)}/>}
      </Card>
    </div>
  </div>)
}