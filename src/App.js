import React from "react";
import "./App.css";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header";
import Main from "./components/main";
import { SvgMask } from "./components/collections";

function App() {
  ReactModal.setAppElement("#root");

  return (
    <div className="App">
      <Router>
        <SvgMask></SvgMask>

        <Switch>
          <Route exact path="/:guildID/:postID">
            <Header></Header>
            <Main></Main>
          </Route>

          <Route exact path="/:guildID">
            <Header></Header>
            <Main></Main>
          </Route>

          <Route path="/">
            <Header></Header>
            <Main></Main>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
