import React from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import AddSongCard from "../../components/AddSongCard/AddSongCard";
import { searchSongs } from "../../services/youtubeService";
import IconButton from "../IconButton/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import YouTube from "react-youtube";
import { useToast } from "../../utils/use-toast";

import "./ModalStyle.css";
import "../../pages/Page.css";


const AddSongModal = (props) => {
    const [show, setShow] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [results, setResults] = React.useState({songs: []});
    const [addList, setAddList] = React.useState([]);
    const [previewId, setPreviewId] = React.useState("");
    const toaster = useToast();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [songLength, updateSongLength] = React.useState(0);

    
    const handleSearch = async (event) => {
        // Prevent reload on pressing enter
        event.preventDefault();

        // Get results for song search
        let result = await searchSongs(searchTerm);
        setResults(result);
    }

    const addSong = (index) => {
        let song = results.songs[index];
        setAddList([...addList, song]);
        updateSongLength(songLength + 1);
    }

    const removeSong = (index) => {
        setAddList(addList.filter((_, i) => i !== index));
        updateSongLength(songLength - 1);
    }

    const confirmAddSongs = () => {
        if((songLength + props.originalSongLength) > 100){
            toaster.notify("Total Songs are over 100! Cannot Merge!");
        }
        else{
            handleClose();
            setResults({songs: []});
            props.addSongsCallback(addList);
            setAddList([]);
            setPreviewId("");
            updateSongLength(0);
        } 
    }

    const cancelAddSongs = () => {
        handleClose();
        setResults({songs: []});
        setAddList([]);
        setPreviewId("");
        updateSongLength(0);
    }

    return (
        <>
        <IconButton variant="primary" onClick={handleShow} disabled={props.disabledButton} component={<AddIcon/>}></IconButton>

        <Modal show={show} onHide={cancelAddSongs}>
            <Modal.Header closeButton className="add-song-modal-header">
                <Modal.Title>Add Song</Modal.Title>
                <div className="search-bar">
                    <IconButton component={<SearchIcon />} callback={handleSearch}/>
                    <Form inline onSubmit={handleSearch}>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="modal-search-bar"
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </Form>
                </div>
            </Modal.Header>
            <Modal.Body className="add-song-modal-body">
                <div className="add-song-content">
                    <div className="song-preview">
                        <YouTube videoId={previewId} opts = {{height: '100%', width: '100%'}}/>
                    </div>
                    <div className="search-results scroll-content">
                        {results.songs.map((song, index) => <AddSongCard song={song} key={index} addCallback={() => addSong(index)} previewCallback={(id) => setPreviewId(id)}/>)}
                    </div>
                </div>
                <div className="confirm-add-song">
                    <div style={{height: "100%"}}>
                        <h5>Songs to Add:</h5>
                        <div className="confirm-add-song-list scroll-content">
                            {addList.map((song, index) => <AddSongCard song={song} key={index} remove={true} addCallback={() => removeSong(index)} />)}
                        </div>
                    </div>
                    <div>
                        <Button className="mm-btn" style={{marginRight: "2vw"}} onClick={confirmAddSongs}>Add Songs</Button>
                        <Button className="mm-btn-warning" onClick={cancelAddSongs}>Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>)
}

export default AddSongModal;