import React from "react";
import { Card } from "react-bootstrap";
import CustomDropdown from "../../Dropdown/Dropdown";
import IconButton from "../../IconButton/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

import "./ModalComponentStyle.css";

const EditPermissionsCard = (props) => {


    return (
        <Card className="edit-permissions-card">
            <div>{props.collaboratorObj.username}</div>
            <div>
                <CustomDropdown items={["Can View", "Can Edit"]} defaultIndex={props.collaboratorObj.privilegeLevel==="view" ? 0 : 1} selectionCallback={(selection) => props.updatePrivilegeLevel(selection)}/>
                <IconButton component={<CancelIcon/>} callback={props.removeCollaborator}/>
            </div>
        </Card>
    )
}

export default EditPermissionsCard;