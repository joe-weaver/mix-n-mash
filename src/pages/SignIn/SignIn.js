import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./SignInStyle.css";

export default class SignIn extends React.Component {
  render() {
    return (
      <div className="splash-container">
        <Card className="text-center signin-card secondary-color-transparent">
          <h1>Mix n' Mash</h1>
          <h2>Log In</h2>
          <Card.Body>
            <Form className="space-above">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username or Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter username or email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Link to="/HottestMixtapes" className="space-above">
                <Button variant="primary" className="mm-btn-alt">
                  Get Mashing!
                </Button>{" "}
              </Link>
            </Form>
          </Card.Body>
          <a href="/" className="mm-link-dark">
            Forgot Credentials
          </a>
        </Card>
      </div>
    );
  }
}
