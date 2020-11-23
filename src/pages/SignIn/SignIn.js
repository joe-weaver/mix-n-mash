import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import GeneratorButton from "../../utils/GeneratorButton"
import { useAuth } from "../../utils/use-auth";
import SignUpForm from "./Components/SignUpForm";

import "./SignInStyle.css";

const SignIn = (props) => {
  let [forgotPassword, setForgotPassword] = React.useState(false);
  let [signup, setSignup] = React.useState(false);

  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");

  const history = useHistory();

  const auth = useAuth();

  const [invalidLoginCreds, setInvalidLoginCreds] = React.useState(false);

  const tryLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Don't bother checking if either field is empty
    if(username !== "" && password !== ""){
      auth.login(username, password).then(res => {
        if(res.error){;
          setInvalidLoginCreds(true);
        } else {
          history.push("/HottestMixtapes");
        }
      });
    } else {
      setInvalidLoginCreds(true);
    }
  }

  const completeSignup = () => {
    setSignup(false);
  }

  return (
    <div className="splash-container">
      <GeneratorButton/>
      <Card className="text-center signin-card secondary-color-transparent">
        {!forgotPassword && !signup && <><h1>Mix n' Mash</h1><h2>Log In</h2></>}
        {forgotPassword && <h2>Forgot Password</h2>}
        {signup && <h2>Sign Up</h2>}

        {/* ---------- LOGIN FORM ---------- */}
        {!forgotPassword && !signup && <Card.Body>
          <Form className="space-above" onSubmit={tryLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username or Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username or email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                isInvalid={invalidLoginCreds}
              />
              <Form.Control.Feedback type="invalid">Invalid username or password</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password{" "}<div className="mm-link-dark" onClick={() => setForgotPassword(true)}>Forgot Password</div></Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary" className="mm-btn-alt">
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
            <SignUpForm cancelSignUp={() => setSignup(false)} successfulSignup={completeSignup}/>
          </Card.Body>}
      </Card>
    </div>
  );
}

export default SignIn;
