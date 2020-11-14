import React from "react";
import { Card } from "react-bootstrap";

import IconButton from "../../IconButton/IconButton";
import CallMergeIcon from "@material-ui/icons/CallMerge";

import "./ModalComponentStyle.css";

const MashMixtapeCard = (props) => {
    return (
        <Card className="edit-permissions-card">
            <div>{props.mixtape.title}</div>
            <IconButton component={<CallMergeIcon/>} onClick={props.mergeMixtape}/>
        </Card>
    )
}

export default MashMixtapeCard;