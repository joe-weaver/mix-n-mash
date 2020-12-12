import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import IconButton from "../../components/IconButton/IconButton"
import ReplyIcon from '@material-ui/icons/Reply';
import { formatDate } from "../../utils/DateUtils";

import "./CommentStyle.css";

const Comment = (props) => {

    const [replyText, setReplyText] = React.useState("");

    const submitReply = (event) => {
        event.preventDefault();

        props.submitReply(replyText);

        setReplyText("");
    }

    return (
        <>
            <div className="space-below" style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div>
                    <Link to={"/User/" + props.comment.userId}>
                        {props.comment.username}:{" "}
                    </Link>
                    {props.comment.content} 
                    <IconButton component={<ReplyIcon />} onClick={props.startReply} edge="end"/>
                </div>
                <div style={{display:"flex", justifyContent:"right", alignItems:"right"}}>{formatDate(props.comment.publishingTime)}</div>
            </div>
            {props.replying && <Form onSubmit={submitReply}>
                <Form.Control
                type="input"
                value={replyText}
                placeholder={"Write your reply here..."}
                onChange={event => setReplyText(event.target.value)}
                maxLength={250}
                />
            </Form>}
            {props.comment.replies.map(reply =>
            <div className="space-below reply" key={reply.username + reply.content} style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div><Link to={"/User/" + reply.userId}>{reply.username}:</Link> {reply.content}</div>
                <div style={{display:"flex", justifyContent:"right", alignItems:"right"}}>{formatDate(reply.publishingTime)}</div>
            </div>)}
        </>);
}

export default Comment;