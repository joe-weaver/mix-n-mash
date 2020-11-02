import React from "react";
import { Modal } from "react-bootstrap";
import CallMergeIcon from "@material-ui/icons/CallMerge";

import IconButton from "../IconButton/IconButton";

import "../../pages/Page.css";

const MashMixtapeModal = (props) => {
    const [show, setShow] = React.useState(false);

    // Get list of mixtapes from user
    const mixtapes = [{title: "Mixtape 1"}, {title: "Mixtape 2"}];
    
    return (<>
        <IconButton component={<CallMergeIcon />} onClick={() => setShow(true)} />

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Sharing Privileges</Modal.Title>
            </Modal.Header>
            <Modal.Body className="scroll-content">
                {mixtapes.map(mixtape => (
                    <div>{mixtape.title}</div>
                ))}
            </Modal.Body>
        </Modal>
        </>);
}

export default MashMixtapeModal;