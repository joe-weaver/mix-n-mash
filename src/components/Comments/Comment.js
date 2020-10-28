import React from "react";
import { Link } from "react-router-dom";

import "./CommentStyle.css";

const Comment = (props) => {

    return (
        <>
            <div className="space-below" style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div><Link to={"/User/" + props.comment.userId}>{props.comment.username}:</Link>{props.comment.content}</div>
                <div style={{display:"flex", justifyContent:"right", alignItems:"right"}}>{props.comment.timeSent}</div>
            </div>
            {props.comment.replies.map(reply =>
            <div className="space-below reply" style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div><Link to={"/User/" + reply.userId}>{reply.username}:</Link> {reply.content}</div>
                <div style={{display:"flex", justifyContent:"right", alignItems:"right"}}>{reply.timeSent}</div>
            </div>)}
        </>);
}

export default Comment;