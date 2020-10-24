import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HottestMixtapes from "./pages/HottestMixtapes/HottestMixtapes";
import MyMixtapes from "./pages/MyMixtapes/MyMixtapes";
import Account from "./pages/Account/Account";
import SignIn from "./pages/SignIn/SignIn";
import MixtapePage from "./pages/MixtapePage/MixtapePage";
import SearchResults from "./pages/SearchResults/SearchResults";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/HottestMixtapes" component={HottestMixtapes} />
      <Route exact path="/MyMixtapes" component={MyMixtapes} />
      <Route exact path="/MyMixtapes/:mixtapeId" component={MixtapePage} />
      <Route path="/Account" component={Account} />
      <Route path="/SearchResults" component={SearchResults} />
    </BrowserRouter>
  );
}
