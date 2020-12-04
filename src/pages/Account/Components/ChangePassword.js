import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import IconButton from "../../../components/IconButton/IconButton";
import { useAuth } from "../../../utils/use-auth";

const ChangePassword = (props) => {
    // Hook into the auth state
    const auth = useAuth();

    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = React.useState(false);

    const [validated, setValidated] = React.useState(false);
    const [isInvalid, setIsInvalid] = React.useState({password: false, newPassword: false});

    const changePassword = (event) => {
        event.preventDefault();

        setValidated(true);
        if(newPassword.length < 6){
            setIsInvalid({password: false, newPassword: true});
        } else {
            // Send the request to the backend
            auth.changePassword(password, newPassword).then(res => {
                if(res.error){
                    setIsInvalid({password: true, newPassword: false});
                } else {
                    // Success
                    setPassword("");
                    setNewPassword("");
                }
            });
        }
    }

    return (
        <Form style={{width: "25%"}} onSubmit={changePassword}>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Control
                            type={passwordVisible ? "text" : "password"}
                            required
                            placeholder="Old Password"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value); isInvalid.password = false; setIsInvalid(isInvalid)}}
                            isInvalid={validated && isInvalid.password}
                        />
                        <Form.Control.Feedback type="invalid">Incorrect password.</Form.Control.Feedback>
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
            <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Row>
                <Col>
                    <Form.Control
                        type={newPasswordVisible ? "text" : "password"}
                        required
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(event) => {setNewPassword(event.target.value); isInvalid.newPassword = false; setIsInvalid(isInvalid)}}
                        isInvalid={validated && isInvalid.newPassword}
                    />
                    <Form.Control.Feedback type="invalid">Your new password must be 6 or more characters in length.</Form.Control.Feedback>
                </Col>
                <Col md="auto">
                    <IconButton
                        component={newPasswordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        onMouseDown={() => setNewPasswordVisible(true)}
                        onMouseUp={() => setNewPasswordVisible(false)}
                    ></IconButton>
                </Col>
            </Form.Row>
        </Form.Group>
        <Button className="mm-btn-alt" type="submit" disabled={password === "" || newPassword === ""}>Change Password</Button>
    </Form>
    )
}

export default ChangePassword;