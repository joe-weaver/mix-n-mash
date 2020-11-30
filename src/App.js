import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import HottestMixtapes from "./pages/HottestMixtapes/HottestMixtapes";
import MyMixtapes from "./pages/MyMixtapes/MyMixtapes";
import Account from "./pages/Account/Account";
import SignIn from "./pages/SignIn/SignIn";
import MixtapePage from "./pages/MixtapePage/MixtapePage";
import SearchResults from "./pages/SearchResults/SearchResults";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "./pages/UserPage/UserPage";
import ReactivateAccount from "./pages/ReactivateAccount/ReactivateAccount";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ProvideAuth } from "./utils/use-auth";

const client = new ApolloClient({
  uri: "http://localhost:3000",
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ProvideAuth>
        <BrowserRouter>
          <Route path="/" exact component={SignIn} />
          <PrivateRoute path="/HottestMixtapes"><HottestMixtapes/></PrivateRoute>
          <PrivateRoute exact path="/MyMixtapes"><MyMixtapes/></PrivateRoute>
          <PrivateRoute exact path="/Mixtape/:mixtapeId"><MixtapePage/></PrivateRoute>
          <PrivateRoute path="/Account"><Account/></PrivateRoute>
          <PrivateRoute path="/SearchResults"><SearchResults/></PrivateRoute>
          <PrivateRoute exact path="/User/:userId"><UserPage/></PrivateRoute>
          <PrivateRoute path="/ReactivateAccount"><ReactivateAccount/></PrivateRoute>
        </BrowserRouter>
      </ProvideAuth>
    </ApolloProvider>
  );
}
