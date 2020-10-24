import React from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

import "./ModalStyle.css";

let results = [
    {
        name: "Land Down Under",
        id: "XfR9iY5y94s"
    },
    {
        name: "Land Down Under",
        id: "XfR9iY5y94s"
    },
    {
        name: "Land Down Under",
        id: "XfR9iY5y94s"
    },
]

const AddSongModal = (props) => {
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
            Add Song
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form inline onSubmit={handleSearch}>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="modal-search-bar"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </Form>
                <div className="add-song-content">
                    <div className="song-preview">
                        <img className="song-preview-frame" src="https://img.youtube.com/vi/XfR9iY5y94s/0.jpg"></img>
                    </div>
                    <div className="search-results">
                        {results.map(song => <div>{song.name}</div>)}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>)
}

export default AddSongModal;