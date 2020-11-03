import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { testClient, getTests } from "../../services/testService";
import { useQuery, useLazyQuery } from "@apollo/client";
import { getUsers, getUser, userClient } from "../../services/userService";

import "./SignInStyle.css";

const SignIn = (props) => {
  let [forgotPassword, setForgotPassword] = React.useState(false);
  let [signup, setSignup] = React.useState(false);

  // let {loading, error, data} = useQuery(getTests, {client: testClient});

  const [get_user, {loading, data}] = useLazyQuery(getUser, {client: userClient});

  let test_func = () => {
    get_user({variables: {id: "5fa07b0648c48023941d9e43"}});
  };
  

  if(loading){
    return <div>Loading</div>
  } else {
    console.log(data);
  }

  return (
    <div className="splash-container">
      <Button onClick={ test_func }>testCall</Button>
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
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password{" "}<div className="mm-link-dark" onClick={() => setForgotPassword(true)}>Forgot Password</div>
            </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Link to="/HottestMixtapes" className="space-above">
              <Button variant="primary" className="mm-btn-alt">
                Get Mashing!
              </Button>{" "}
            </Link>
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
