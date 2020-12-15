import React from "react";
import { Modal } from "react-bootstrap";
import EditPermissionsCard from "./Components/EditPermissionsCard";
import AddCollaboratorCard from "./Components/AddCollaboratorCard";
import IconButton from "../../components/IconButton/IconButton";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { useMutation } from "@apollo/client";

import "./ModalStyle.css";
import "../../pages/Page.css";
import { useAuth } from "../../utils/use-auth";
import { mixtapesClient } from "../../services/mixtapesService";
import { updateCollaborators as updateCollaboratorsMut } from "../../services/mixtapesService";


const AddCollaboratorModal = (props) => {
    const auth = useAuth();
    const user = auth.user;

    const [show, setShow] = React.useState(false);

    const [collaborators, setCollaborators] = React.useState(props.mixtape.collaborators)
    const mashmates = user.mashmates;
    const mashmatesNotCollaborators = mashmates.filter(m => !collaborators.reduce((acc, c) => (c.userId === m.id) || acc, false));

    const [updateCollaboratorsMutation] = useMutation(updateCollaboratorsMut, {client: mixtapesClient});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeCollaborator = (collaborator) => {
        let tempCollaborators = collaborators.filter(c => c.userId!==collaborator.userId).map(c => ({userId: c.userId, username: c.username, privilegeLevel: c.privilegeLevel}));
        updateCollaboratorsMutation({variables:{id: props.mixtape._id, collaborators: tempCollaborators}});
        setCollaborators(tempCollaborators);
    }

    const addCollaborator = (mashmate) => {
        let tempCollaborators = collaborators.map(c => ({userId: c.userId, username: c.username, privilegeLevel: c.privilegeLevel}));
        let newCollaborator = {userId: mashmate.id, username: mashmate.username, privilegeLevel: "view"};
        tempCollaborators.push(newCollaborator);
        updateCollaboratorsMutation({variables:{id: props.mixtape._id, collaborators: tempCollaborators}});
        setCollaborators(tempCollaborators);
    }

    const updatePrivilegeLevel = (privilegeLevelStr, collaborator) => {
        let tempCollaborators = collaborators.map(c => 
            {if (c.userId === collaborator.userId){
                return ({userId: c.userId, username: c.username, privilegeLevel: privilegeLevelStr==="Can View" ? "view" : "edit"});
            } else {
                return ({userId: c.userId, username: c.username, privilegeLevel: c.privilegeLevel});
            }}
        );
        updateCollaboratorsMutation({variables: {id: props.mixtape._id, collaborators: tempCollaborators}});
        setCollaborators(tempCollaborators);
    }
        


    return (
        <>
        <IconButton component={<GroupAddIcon />} onClick={handleShow} />

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sharing Privileges</Modal.Title>
            </Modal.Header>
            <Modal.Body className="add-collaborator-body">
                <div className="height50">
                    <h5>Edit Permissions</h5>
                    <div className="scroll-content height80">
                        {collaborators.map(collaborator => (<EditPermissionsCard key={collaborator.userId} collaboratorObj={collaborator} removeCollaborator={()=>{removeCollaborator(collaborator);}} updatePrivilegeLevel={(selection) => updatePrivilegeLevel(selection, collaborator)}/>))}
                    </div>
                </div>
                <div className="height50">
                    <h5>Add Collaborator</h5>
                    <div className="scroll-content height80">
                        {mashmatesNotCollaborators.map(mashmate => (<AddCollaboratorCard key={mashmate.id} mashmateObj={mashmate} addCollaborator={()=>{addCollaborator(mashmate);}}/>))}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>)
}

export default AddCollaboratorModal;