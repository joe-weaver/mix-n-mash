import React from "react";
import { Modal } from "react-bootstrap";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import { useQuery, useMutation } from "@apollo/client";

import { mixtapesClient, getUserMixtapes, mashMixtape as mashMixtapeMut } from "../../services/mixtapesService";
import IconButton from "../IconButton/IconButton";
import MashMixtapeCard from "./Components/MashMixtapeCard";

import "../../pages/Page.css";

const MashMixtapeModal = (props) => {
    const id = JSON.parse(window.sessionStorage.getItem("user"))._id;

    const [show, setShow] = React.useState(false);

    // Get list of mixtapes from user
    const {loading, data} = useQuery(getUserMixtapes, {client: mixtapesClient, variables: {userId: id}});
    const [mashMixtape] = useMutation(mashMixtapeMut, {client: mixtapesClient});

    const mergeMixtape = (mixtape) => {
        let songs = [];

        let i = 0;
        let j = 0;

        while(i < mixtape.songs.length && j < props.mixtape.songs.length){
            let choice = Math.random();

            if(choice < 0.5){
                songs.push(mixtape.songs[i]);
                i++;
            } else {
                songs.push(props.mixtape.songs[j]);
                j++;
            }
        }

        while(i < mixtape.songs.length || j < props.mixtape.songs.length){
            if(i < mixtape.songs.length){
                songs.push(mixtape.songs[i]);
                i++;
            } else {
                songs.push(props.mixtape.songs[j]);
                j++;
            }
        }

        let genres = [...mixtape.genres];

        for(let genre of props.mixtape.genres){
            if(!genres.includes(genre)){
                genres.push(genre);
            }
        }

        let reqObj = {
            id: mixtape._id,
            title: mixtape.title + " X " + props.mixtape.title,
            songs: songs.map(song => ({name: song.name, youtubeId: song.youtubeId})),
            genres: genres
        }

        mashMixtape({variables: reqObj});

        setShow(false);
    }

    return (<>
        <IconButton component={<CallMergeIcon />} onClick={() => setShow(true)} />

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Merge: <br/>Select a mixtape to recieve the contents of the mixtape you are viewing.</Modal.Title>
            </Modal.Header>
            <Modal.Body className="scroll-content">
                {!loading && data.getUserMixtapes.filter(mixtape => mixtape.ownerId === id).map(mixtape => (
                    <MashMixtapeCard key={mixtape._id} mixtape={mixtape} mergeMixtape={() => mergeMixtape(mixtape)}></MashMixtapeCard>
                ))}
            </Modal.Body>
        </Modal>
        </>);
}

export default MashMixtapeModal;