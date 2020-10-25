import React from "react";
import { Card } from "react-bootstrap";
import Dropdown from "../../Dropdown/Dropdown";
import IconButton from "../../IconButton/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

import "./ModalComponentStyle.css";

const EditPermissionsCard = (props) => {


    return (
        <Card className="edit-permissions-card">
            <div>{props.collaborator.username}</div>
            <div>
                <Dropdown items={["Can View", "Can Edit"]} defaultIndex={0} selectionCallback={(selection) => console.log(selection)}/>
                <IconButton component={<CancelIcon/>} callback={props.removeCollaborator}/>
            </div>
        </Card>
    )
}

export default EditPermissionsCard;