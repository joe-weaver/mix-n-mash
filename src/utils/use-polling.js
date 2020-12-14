import React from "react";
import { useQuery } from "@apollo/client";
import { mixtapesClient, getMixtape } from "../services/mixtapesService";

const pollingContext = React.createContext();

export function ProvidePolling({children}){
    const polling = useProvidePolling();
    return <pollingContext.Provider value={polling}>{children}</pollingContext.Provider>
}

export const usePolling = () => {
    return React.useContext(pollingContext);
}

function useProvidePolling(){

    const [mixtapeId, setMixtapeId] = React.useState("0");
    
    const queryObj = useQuery(getMixtape, {client: mixtapesClient, variables: {id: mixtapeId}, pollInterval: 1000, onCompleted: (data)=>{
        setMixtapeId(data.mixtape._id);
    }});

    const startPolling = (newMixtapeId) => {
        setMixtapeId(newMixtapeId);
        queryObj.refetch({variables: {id: newMixtapeId}});
    }

    return {
        data: queryObj.data,
        mixtapeId,
        loading: queryObj.loading || (queryObj.data === undefined || queryObj.data.mixtape === null),
        startPolling
    }



}