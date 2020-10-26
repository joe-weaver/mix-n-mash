import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./SignInStyle.css";

export default class SignIn extends React.Component {
  constructor(props){
    super(props);

    this.state = {forgotCredential: false, signup: false}
  }

  render() {
    return (
      <div className="splash-container">
        <Card className="text-center signin-card secondary-color-transparent">
          {!this.state.forgotCredential && !this.state.signup && <><h1>Mix n' Mash</h1><h2>Log In</h2></>}
          {this.state.forgotCredential && <h2>Forgot Password</h2>}
          {this.state.signup && <h2>Sign Up</h2>}

          {!this.state.forgotCredential && !this.state.signup && <Card.Body>
            <Form className="space-above">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username or Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter username or email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password{" "}<div className="mm-link-dark" onClick={() => this.setState({forgotCredential: true})}>Forgot Password</div>
              </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Link to="/HottestMixtapes" className="space-above">
                <Button variant="primary" className="mm-btn-alt">
                  Get Mashing!
                </Button>{" "}
              </Link>
              <Button variant="primary" className="mm-btn-alt" onClick={() => this.setState({forgotCredential: false, signup: true})}>
                No Account? Sign Up!
              </Button>

            </Form>
          </Card.Body>}

          {this.state.forgotCredential && <Card.Body>
            <div>Email Sent. Check your inbox.</div>
            <br/>
            <Button variant="primary" className="mm-btn-alt" onClick={() => this.setState({forgotCredential: false, signup: false})}>
              Back to Log-In
            </Button>
          </Card.Body>}

          {this.state.signup &&
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
                <Button variant="primary" className="mm-btn-alt" onClick={() => this.setState({forgotCredential: false, signup: false})}>
                  Create Account
                </Button>
              </Form>
            </Card.Body>}
        </Card>
      </div>
    );
  }
}
