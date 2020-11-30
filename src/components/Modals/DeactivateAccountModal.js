import React from "react";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";

const DeactivateAccountModal = (props) => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" className="mm-btn-warning" onClick={handleShow}>Deactivate Account</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Account Deactivation</Modal.Title>
            </Modal.Header>
            <Modal.Body className="add-collaborator-body">
                <div>
                    <h2>Are you sure you would like to deactivate your Mix n' Mash account?</h2> 
                    <h3>(Your account can be reactivated at any time by logging in)</h3>
                    <div className="scroll-content">
                        <Button className="mm-btn-warning" onClick={handleClose}>Cancel</Button>
                        <Button className="mm-btn-alt" onClick={props.deactivateCallback}> Deactivate Account </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>)
}

export default DeactivateAccountModal;