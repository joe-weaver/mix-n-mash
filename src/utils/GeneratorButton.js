import React from "react";
import { Button } from "react-bootstrap";
import { generateMixtape, generateUser, randomFrom, randomFromRangeInt } from "./generator";
import { userClient, addUser } from "../services/userService";
import { mixtapesClient, addMixtape } from "../services/mixtapesService";
import { useMutation } from "@apollo/client";

let users;
let mixtapes;
let index;
const n = 10;
const m = 40;

const GeneratorButton = (props) => {

    const [addMixtapeToDatabase] = useMutation(addMixtape, {client: mixtapesClient, onCompleted: (data) => {
        mixtapes[index-1]._id = data.addMixtape._id;

        if(index >= m){
            return
        }

        let mixtape = mixtapes[index];


        for(let i = 0; i < n; i++){
            // Decide whether or not to add this person
            if(Math.random() < 0.8){
                continue;
            }

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

        // Get random number of users to be mashmates
        let r = randomFromRangeInt(0, index);

        for(let i = 0; i < r; i++){
            // Generate a mashmate object or request
            if(Math.random() < 0.5){
                // Mashmates
                user.mashmates.push({
                    id: users[i]._id,
                    username: users[i].username
                });
            
            } else {
                // Mashmate request
                let mmr = {
                    senderId: users[i]._id,
                    recipientId: "NotYetImplemented",
                    username: users[i].username,
                    seen: false
                }
                user.receivedMashmateRequests.push(mmr);
            }
        }

        index += 1;
        addUserToDatabase({variables: user});
    }});

    const generateUsers = () => {
        users = [];
        index = 1;

        for(let i = 0; i < n; i++){
            users.push(generateUser());
        }

        // Print a random user for login
        console.log("Here's a sample user to log in with: " + users[n-1].username);

        addUserToDatabase({variables: users[0]});
    }

    return <Button onClick={generateUsers}>Generate Data</Button>
}

export default GeneratorButton;