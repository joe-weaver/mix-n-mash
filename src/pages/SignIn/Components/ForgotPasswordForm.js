import React from "react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Col, Button, Form } from "react-bootstrap";

import { useAuth } from "../../../utils/use-auth";
import IconButton from "../../../components/IconButton/IconButton";

const ForgotPasswordForm = (props) => {
    // Hook into auth
    const auth = useAuth();

    const [receivedEmailCode, setReceivedEmailCode] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [tempEmail, setTempEmail] = React.useState("");
    const [tempCode, setTempCode] = React.useState("");
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [isInvalid, setIsInvalid] = React.useState({code: false, password: false});
    const [validated, setValidated] = React.useState(false);

    const handleResetPassword = () => {
        // After one submission, start validating
        setValidated(true);

        if(newPassword.length >= 6){
            auth.resetPassword(tempEmail, tempCode, newPassword).then((res)=>{
                if(res.error){
                    // Error, so tell user the code is invalid or expired
                    setIsInvalid({code: true, password: false});
                } else {
                    props.setForgotPassword(false);
                    setReceivedEmailCode(false); 
                    setTempEmail(""); 
                    setTempCode(""); 
                    setNewPassword("");
                }
            });
        } else {
            // Password is too short - invalid
            setIsInvalid({code: false, password: true});
        }
    }

    const cancelForgotPassword = () => {
        props.setForgotPassword(false);
        setReceivedEmailCode(false);
        setTempEmail("");
        setTempCode("");
        setNewPassword("");
    }

    if(!receivedEmailCode){
        return (
        <>
            <div>Please enter your email:</div>
            <Form.Group>
              <Form.Control type="email" placeholder="Enter the email for your account..." onChange={(event)=> setTempEmail(event.target.value)}/>
            </Form.Group>
            <Button className="mm-btn-alt" onClick={() => {auth.forgotPassword(tempEmail); setReceivedEmailCode(true);}}>Send Email</Button>
            <br/>
            <Button variant="primary" className="mm-btn-alt" onClick={cancelForgotPassword}>
              Back to Log-In
            </Button>
        </>
          )
    } else {
        return (
        <>
            <div>Please enter the temporary code sent to your email:</div>
            <Form.Group>
                <Form.Label>Reset Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Code"
                    onChange={(event) => {setTempCode(event.target.value); isInvalid.code = false; setIsInvalid(isInvalid)}}
                    isInvalid={validated && isInvalid.code}
                />
                <Form.Control.Feedback type="invalid">Code is invalid or expired.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Row>
                <Col>
                    <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        required
                        placeholder="Password"
                        onChange={(event) => {setNewPassword(event.target.value); isInvalid.password = false; setIsInvalid(isInvalid)}}
                        isInvalid={validated && isInvalid.password}
                    />
                    <Form.Control.Feedback type="invalid">You must enter a password with more than 6 characters.</Form.Control.Feedback>
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
            <Button className="mm-btn-alt" onClick={handleResetPassword}>Update Password</Button>
            <br/>
            <Button variant="primary" className="mm-btn-alt" onClick={cancelForgotPassword}>
              Back to Log-In
            </Button>
        </>
        )
    }
}

export default ForgotPasswordForm;