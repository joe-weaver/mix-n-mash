import React from "react";
import { Button } from "react-bootstrap";
import { generateMixtape, generateUser, randomFrom } from "./generator";
import { userClient, addUser } from "../services/userService";
import { mixtapesClient, createMixtapeAdmin } from "../services/mixtapesService";
import { useMutation } from "@apollo/client";

let users;
let mixtapes;
let index;
const n = 50;
const m = 200;

const GeneratorButton = (props) => {

    const [addMixtapeToDatabase] = useMutation(createMixtapeAdmin, {client: mixtapesClient, onCompleted: (data) => {
        mixtapes[index-1]._id = data.createMixtapeAdmin._id;

        if(index >= m){
            return
        }

        let mixtape = mixtapes[index];

        let numCollabs = 0;

        for(let i = 0; i < n; i++){
            if(numCollabs > 5){
                break;
            }
            
            // Decide whether or not to add this person
            if(Math.random() < 0.8){
                continue;
            }

            numCollabs += 1;

            let user = users[i];

            if(user._id !== mixtape.ownerId){
                // Add the user to the mixtape as a collaborator with a random permission level
                let permissionLevel = randomFrom(["edit", "view"]);
                let pmo = {
                    userId: user._id,
                    username: user.username,
                    privilegeLevel: permissionLevel,
                };
                mixtape.collaborators.push(pmo);
            }
        }

        index += 1
        addMixtapeToDatabase({variables: mixtape});
    }});

    const generateMixtapes = () => {
        mixtapes = [];
        index = 0;

        for(let i = 0; i < m; i++){
            mixtapes.push(generateMixtape(randomFrom(users)));
        }

        addMixtapeToDatabase({variables: mixtapes[index++]});
    }

    const [addUserToDatabase] = useMutation(addUser, {client: userClient, onCompleted: (data) => {
        users[index-1]._id = data.addUser._id;
        
        if(index >= n){
            generateMixtapes();
            return;
        }

        let user = users[index];

        index += 1;
        addUserToDatabase({variables: user});
    }});

    const generateUsers = () => {
        users = [];
        index = 1;

        for(let i = 0; i < n; i++){
            users.push(generateUser());
        }

        addUserToDatabase({variables: users[0]});
    }

    return <Button onClick={generateUsers}>Generate Data</Button>
}

export default GeneratorButton;