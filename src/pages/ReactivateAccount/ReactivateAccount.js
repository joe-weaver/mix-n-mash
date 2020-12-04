import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../utils/use-auth";
import {reactivateAccount as reactivateAccountMut, userClient} from "../../services/userService";
import {mixtapesClient, getAllUserMixtapes, updateOwnerActive as updateOwnerActiveMut} from "../../services/mixtapesService";

import "./ReactivateAccountStyle.css";
import { useMutation, useQuery } from "@apollo/client";

const ReactivateAccount = (props) => {
    const history = useHistory();

    // Hook into the auth
    const auth = useAuth();

    console.log(auth.user);

    const [reactivateAccountMutation] = useMutation(reactivateAccountMut, {client: userClient, onCompleted: ()=>{auth.getUser(); history.push("/HottestMixtapes")}});

    const [updateOwnerActiveMutation] = useMutation(updateOwnerActiveMut, {client: mixtapesClient});

    let {loading, data} = useQuery(getAllUserMixtapes, {client: mixtapesClient, variables:{userId: auth.user._id}});

    const updateMixtapesOwnerActive = () => {
      if(!loading){
          data.getAllUserMixtapes.filter((mixtape) => mixtape.ownerId === auth.user._id)
          .forEach((mixtape)=>{updateOwnerActiveMutation({variables: {id: mixtape._id, ownerActive: true}})});
      }
    }
    
    return (
        <div className="splash-container">
          <Card className="text-center signin-card secondary-color-transparent">
    
            {/* ---------- LOGIN FORM ---------- */}
            <Card.Body>
              <Form className="space-above">
                  <h2>Your account is currently deactivated. Would you like to reactivate your account?</h2>
                  <h3>(You can deactivate your account again at any time)</h3>
              </Form>
            </Card.Body>
            <Card.Body>
                <Button className="mm-btn-warning" onClick={() => {auth.logout().then(success => {if(success !== false){history.push("/");}})}}>Cancel</Button>
                <Button className="mm-btn-alt" onClick={() => {updateMixtapesOwnerActive(); reactivateAccountMutation({variables: {id: auth.user._id}});}}>Reactivate Account</Button>
            </Card.Body>
          </Card>
        </div>
      );
  }
  
  export default ReactivateAccount;