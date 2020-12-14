import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../utils/use-auth";
import {reactivateAccount as reactivateAccountMut, userClient} from "../../../services/userService";
import {mixtapesClient, getAllUserMixtapes, updateOwnerActive as updateOwnerActiveMut} from "../../../services/mixtapesService";
import { useMutation, useQuery } from "@apollo/client";

export default function ReactivateAccount(props){
    const history = useHistory();

    // Hook into the auth
    const auth = useAuth();

    const [reactivateAccountMutation] = useMutation(reactivateAccountMut, {client: userClient, onCompleted: ()=>{auth.getUser(); history.push("/HottestMixtapes")}});

    const [updateOwnerActiveMutation] = useMutation(updateOwnerActiveMut, {client: mixtapesClient});

    let {loading, data} = useQuery(getAllUserMixtapes, {client: mixtapesClient, variables:{userId: auth.user._id}});

    const updateMixtapesOwnerActive = () => {
      if(!loading){
          data.getAllUserMixtapes.filter((mixtape) => mixtape.ownerId === auth.user._id)
          .forEach((mixtape)=>{updateOwnerActiveMutation({variables: {id: mixtape._id, ownerActive: true}})});
      }
    }
    
    return (<>
        <Card.Header>
            <h2>Reactivate Account</h2>
        </Card.Header>
        <Card.Body>
            <Form className="space-above">
                <h5>Your account is currently deactivated. Would you like to reactivate your account?</h5>
                <div>(You can deactivate your account again at any time)</div>
            </Form>
        </Card.Body>
        <Card.Footer>
            <Button className="mm-btn-warning" onClick={() => {auth.logout().then(success => {if(success !== false){props.exitReactivate();}})}}>Cancel</Button>
            <Button className="mm-btn" onClick={() => {updateMixtapesOwnerActive(); reactivateAccountMutation({variables: {id: auth.user._id}});}}>Reactivate Account</Button>
        </Card.Footer>
    </>);
}