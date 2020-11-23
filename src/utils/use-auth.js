import React from "react";
import {
    login as loginPassport,
    logout as logoutPassport,
    signup as signupPassport,
    getUser as getUserPassport} from "../services/authService";

const authContext = React.createContext();

// Make auth available to all children wrapped in this
export function ProvideAuth({children}){
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object
export const useAuth = () => {
    return React.useContext(authContext);
}

// Provider that creates auth object and handles state
function useProvideAuth(){
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [initialized, setInitialized] = React.useState(false);

    const login = (usernameOrEmail, password) => {
        setLoading(true);
        return loginPassport(usernameOrEmail, password)
            .then(userOrError => {
                if(userOrError.error){
                    // We have an error, so just return it without setting user
                    setLoading(false);
                    return userOrError;
                } else {
                    // We have a valid user from login, so set user object
                    setLoading(false);
                    setUser(userOrError);
                    return userOrError;
                }
            });
    }

    const logout = () => {
        setLoading(true);
        return logoutPassport().then(success => {
            if(success){
                setUser(false);
            }
            setLoading(false);
            return success;
        });
    }

    const signup = (username, email, password) => {
        setLoading(true);
        return signupPassport(username, email, password).then(userOrError => {
            if(userOrError.error){
                // We have an error, so just return the error without setting user
                setLoading(false);
                return userOrError;
            } else {
                // We just created a valid user, so set the user object
                console.log("Setting user:", user);
                setUser(userOrError);
                return userOrError;
            }
        });
    }

    const doOptimisticUpdate = (userFields) => {
        if(user){
            for(let key in userFields){
                if(user[key] !== undefined){
                    user[key] = userFields[key];
                }
            }
            console.log("Optimistic User:", user);
            setUser(user);
        }
    }

    // Retrieves an UPDATED version of the user from the database
    const getUser = (userFields) => {
        if(userFields !== undefined){
            doOptimisticUpdate(userFields);
        }
        setLoading(true);
        return getUserPassport().then(userOrError => {
            if(userOrError.error){
                setLoading(false);
                return userOrError;
            } else {
                setUser(userOrError);
                setLoading(false);
                return userOrError;
            }
        });
    }

    // If provideAuth is being called, the app was just created, so see if a user session still exists
    // from a previously obtained cookie
    if(!initialized){
        setInitialized(true);
        getUser();
    }
    

    return {
        user,
        loading,
        login,
        logout,
        signup,
        getUser
    }
}