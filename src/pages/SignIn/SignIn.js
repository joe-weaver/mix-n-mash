import React from "react";
import { Card, Button } from "react-bootstrap";

import LoginForm from "./Components/LoginForm"
import SignUpForm from "./Components/SignUpForm";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import ReactivateAccountForm from "./Components/ReactivateAccountForm";

import "./SignInStyle.css"

export default function SignIn(props){
  const [forgotPassword, setForgotPassword] = React.useState(false);
  const [signup, setSignup] = React.useState(false);
  const [reactivateAccount, setReactivateAccount] = React.useState(false);

  return(
  <div className="mm-container single-screen splash-screen">
    <div className="logo-container slide-left">
        <img src={require("../../images/headphones w rainbow w text.svg")} id="logo"/>
    </div>
    <div className="login-container">
      <Card className="login-card fade-in">
        {!forgotPassword && !signup && !reactivateAccount && <LoginForm setForgotPassword={setForgotPassword} setSignup={setSignup} reactivateAccount={()=>setReactivateAccount(true)}/>}
        {forgotPassword && <ForgotPasswordForm setForgotPassword={setForgotPassword} />}
        {signup && <SignUpForm exitSignUp={() => setSignup(false)}/>}
        {reactivateAccount && <ReactivateAccountForm exitReactivate={() => setReactivateAccount(false)}/>}
      </Card>
    </div>
  </div>)
}