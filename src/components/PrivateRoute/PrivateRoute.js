import React from "react";
import { Route } from "react-router-dom";

const { Redirect } = require("react-router-dom");
const { useAuth } = require("../../utils/use-auth")

export default function PrivateRoute({children, ...rest}){
    const auth = useAuth();

    // If auth hasn't been initialized (page refresh), check if there is a user before doing anything else
    // if(!auth.initialized){
    //     auth.getUser();
    // }

    return (
        <Route
            {...rest}
            render={({location}) => 
                auth.user ? (
                    children
                ) : auth.loading ? <></> : (
                    <Redirect to={{
                        pathname: "/",
                        state: { from: location }
                      }}/>
                )
            }
        />
    )
}