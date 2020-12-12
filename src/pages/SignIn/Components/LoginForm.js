import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../utils/use-auth";

export default function LoginForm(props){
  const auth = useAuth();
  const history = useHistory();

  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
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
          if (res.active){
            history.push("/HottestMixtapes");
          }
          else {
            history.push("/ReactivateAccount");
          }
        }
      });
    } else {
      setInvalidLoginCreds(true);
    }
  }

  console.log(props);
  
  return (<>
    <Card.Header>
      <h2>Log In</h2>
      <div className="mm-link-dark" onClick={() => props.setSignup(true)}>No Account? Sign Up!</div>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={tryLogin}>
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
          <Form.Label style={{display: "flex", justifyContent: "space-between"}}>Password{" "}<span className="mm-link-dark" onClick={() => props.setForgotPassword(true)}>Forgot Password</span></Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>
        {/* Hidden button to handle form submission w/ enter key */}
        <Button type="submit" variant="primary" className="mm-btn" hidden></Button>
      </Form>
    </Card.Body>
    <Card.Footer>
      <Button variant="primary" className="mm-btn" onClick={tryLogin}>
        Get Mashing!
      </Button>
    </Card.Footer>
    
  </>)   
}