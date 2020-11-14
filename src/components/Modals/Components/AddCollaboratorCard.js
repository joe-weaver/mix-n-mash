import React from "react";
import { Card } from "react-bootstrap";
import IconButton from "../../IconButton/IconButton";
import AddIcon from '@material-ui/icons/Add';

import "./ModalComponentStyle.css";

const AddCollaboratorCard = (props) => {


    return (
        <Card className="edit-permissions-card">
            <div>{props.mashmate.username}</div>
            <IconButton component={<AddIcon/>} callback={props.addCollaborator}/>
        </Card>
    )
}

export default AddCollaboratorCard;