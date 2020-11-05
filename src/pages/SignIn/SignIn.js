import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { userClient, getUserByUsernameOrEmail } from "../../services/userService";
import { useHistory } from "react-router-dom";
import GeneratorButton from "../../utils/GeneratorButton"

import "./SignInStyle.css";

const SignIn = (props) => {
  let [forgotPassword, setForgotPassword] = React.useState(false);
  let [signup, setSignup] = React.useState(false);
  let [checkingLogin, setCheckingLogin] = React.useState(false);

  let [username, setUsername] = React.useState("");

  const history = useHistory();

  const retrievedUser = () => {
    let user = data.getUserByUsernameOrEmail;
    if(user){
      console.log(user);
      window.sessionStorage.setItem("user", JSON.stringify(user));
      history.push("/HottestMixtapes");
    } else {
      console.log("No such user")
    }
  }

  const [getUser, { loading, data }] = useLazyQuery(getUserByUsernameOrEmail, {client: userClient, onCompleted: retrievedUser});

  const tryLogIn = () => {
    console.log("Trying Log in");
    getUser({variables: {usernameOrEmail: username}});
  }

  return (
    <div className="splash-container">
      <GeneratorButton/>
      <Card className="text-center signin-card secondary-color-transparent">
        {!forgotPassword && !signup && <><h1>Mix n' Mash</h1><h2>Log In</h2></>}
        {forgotPassword && <h2>Forgot Password</h2>}
        {signup && <h2>Sign Up</h2>}

        {!forgotPassword && !signup && <Card.Body>
          <Form className="space-above">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username or Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter username or email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password{" "}<div className="mm-link-dark" onClick={() => setForgotPassword(true)}>Forgot Password</div>
            </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" className="mm-btn-alt" onClick={tryLogIn}>
              Get Mashing!
            </Button>{" "}
            <Button variant="primary" className="mm-btn-alt" onClick={() => setSignup(true)}>
              No Account? Sign Up!
            </Button>

          </Form>
        </Card.Body>}

        {forgotPassword && <Card.Body>
          <div>Email Sent. Check your inbox.</div>
          <br/>
          <Button variant="primary" className="mm-btn-alt" onClick={() => setForgotPassword(false)}>
            Back to Log-In
          </Button>
        </Card.Body>}

        {signup &&
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Choose a username"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
              <Button variant="primary" className="mm-btn-alt" onClick={() => setSignup(false)}>
                Create Account
              </Button>        
              <Button variant="primary" className="mm-btn-alt" onClick={() => setSignup(false)}> 
                Cancel
              </Button>
            </Form>
          </Card.Body>}
      </Card>
    </div>
  );
}

export default SignIn;
