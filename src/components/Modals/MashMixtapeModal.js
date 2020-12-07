import React from "react";
import { Modal } from "react-bootstrap";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import { useQuery, useMutation } from "@apollo/client";

import { mixtapesClient, getUserMixtapes, mashMixtape as mashMixtapeMut } from "../../services/mixtapesService";
import IconButton from "../IconButton/IconButton";
import MashMixtapeCard from "./Components/MashMixtapeCard";
import { useAuth } from "../../utils/use-auth";
import { useToast } from "../../utils/use-toast";

import "../../pages/Page.css";

const MashMixtapeModal = (props) => {
    // Hook into the auth state
    const auth = useAuth();

    // Hook into notifications
    const toaster = useToast();

    const [show, setShow] = React.useState(false);

    // Get list of mixtapes from user
    const {loading, data} = useQuery(getUserMixtapes, {client: mixtapesClient, variables: {userId: auth.user._id}});
    const [mashMixtape] = useMutation(mashMixtapeMut, {client: mixtapesClient, onCompleted: (data) => {
        // Notify the user a mixtape was created
        toaster.notify("Mixtape Mashed", <>You just mashed a mixtape!</>);
    }});

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
                {!loading && data.getUserMixtapes.filter(mixtape => mixtape.ownerId === auth.user._id).map(mixtape => (
                    <MashMixtapeCard key={mixtape._id} mixtape={mixtape} mergeMixtape={() => mergeMixtape(mixtape)}></MashMixtapeCard>
                ))}
            </Modal.Body>
        </Modal>
        </>);
}

export default MashMixtapeModal;