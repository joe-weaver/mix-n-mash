import React from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import EditPermissionsCard from "./Components/EditPermissionsCard";
import AddCollaboratorCard from "./Components/AddCollaboratorCard";

import "./ModalStyle.css";
import "../../pages/Page.css";

let currentCollaborators = [
    {
        userId: 0,
        username: "the_REAL_Wolfie",
        privilegeLevel: "view"
    },
    {
        userId: 1,
        username: "kansasGovernor420",
        privilegeLevel: "edit"
    },
    {
        userId: 2,
        username: "mamaFORTRAN98",
        privilegeLevel: "view"
    }
];

let mashmates = [
    {
        mashmateId: 3,
        username: "newdeer22",
    },
    {
        mashmateId: 4,
        username: "badcows0",
    },
    {
        mashmateId: 5,
        username: "applebeesOfficial",
    },
    {
        mashmateId: 6,
        username: "ANGRYarms",
    },
    {
        mashmateId: 7,
        username: "newageDisco",
    },
    {
        mashmateId: 8,
        username: "gottaLoveJSON",
    }
];

const AddCollaboratorModal = (props) => {
    const [show, setShow] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(searchTerm);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Edit Sharing Privileges
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sharing Privileges</Modal.Title>
            </Modal.Header>
            <Modal.Body className="add-collaborator-body">
                <div className="height50">
                    <h5>Edit Permissions</h5>
                    <div className="scroll-content">
                        {currentCollaborators.map(collaborator => (<EditPermissionsCard collaborator={collaborator}/>))}
                    </div>
                </div>
                <div className="height50">
                    <h5>Add Collaborator</h5>
                    <div className="scroll-content height50">
                        {mashmates.map(mashmate => (<AddCollaboratorCard mashmate={mashmate}/>))}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>)
}

export default AddCollaboratorModal;