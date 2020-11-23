import React from "react";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Button, Form, Col } from "react-bootstrap";

import { useAuth } from "../../../utils/use-auth";
import IconButton from "../../../components/IconButton/IconButton";

const SignUpForm = (props) => {
    // Hook into the auth state
    const auth = useAuth();

    // Hook into state
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const [validated, setValidated] = React.useState(false);
    const [isInvalid, setIsInvalid] = React.useState({email: false, username: false, password: false});

    const emailRegex = /^.+@.+\..+/;

    const signUp = (event) => {
        event.preventDefault();

        // Start validating after initial submit
        setValidated(true);
        if(email === "" || !emailRegex.test(email) || username === "" || password === ""){
            // Empty fields are invalid
            setIsInvalid({email: email === "" || !emailRegex.test(email), username: username === "", password: password === ""});
        } else {
            // If no fields are empty, try to create a user
            auth.signup(username, email, password).then(res => {
                if(!res.error){
                    // We may not have created account
                    if(!res.userCreated){
                        setIsInvalid({email: res.emailExists, username: res.usernameExists, password: false});
                    } else {
                        // We created a user, so login
                        props.successfulSignup();
                    }
                }
            });
        }
    }

    return (
    <Form>
        <Form.Group noValidate controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                required
                placeholder="Enter email"
                onChange={event => {setEmail(event.target.value); isInvalid.email = false; setIsInvalid(isInvalid)}}
                isInvalid={validated && isInvalid.email}
            />
            <Form.Control.Feedback type="invalid">{email === "" ? "You must enter a valid email." : "That email already has an account."}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group noValidate>
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                required
                placeholder="Choose a username"
                onChange={event => {setUsername(event.target.value); isInvalid.username = false; setIsInvalid(isInvalid)}}
                isInvalid={validated && isInvalid.username}
            />
            <Form.Control.Feedback type="invalid">{username === "" ? "You must enter a username." : "Username already exists"}</Form.Control.Feedback>

        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Row>
                <Col>
                    <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        required
                        placeholder="Password"
                        onChange={(event) => {setPassword(event.target.value); isInvalid.password = false; setIsInvalid(isInvalid)}}
                        isInvalid={validated && isInvalid.password}
                    />
                    <Form.Control.Feedback type="invalid">You must enter a password.</Form.Control.Feedback>
                </Col>
                <Col md="auto">
                    <IconButton
                        component={passwordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        onMouseDown={() => setPasswordVisible(true)}
                        onMouseUp={() => setPasswordVisible(false)}
                    ></IconButton>
                </Col>
            </Form.Row>
        </Form.Group>
        <Button variant="primary" type="submit" className="mm-btn-alt" onClick={signUp}>
        Create Account
        </Button>        
        <Button variant="primary" className="mm-btn-alt" onClick={props.cancelSignUp}> 
        Cancel
        </Button>
    </Form>
    )
}

export default SignUpForm;