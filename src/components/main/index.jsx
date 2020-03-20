import React from "react";
import styles from "./styles.module.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { Homepage } from "./homepage";
import { Postpage } from "../postpage";

const Main = () => {
  return (
    <main className={styles.main}>
      <SimpleBar className={styles.bar} forceVisible="y" autoHide={false}>
        <Router>
          <Switch>
            <Route exact path="/:guildID/:postID">
              <Postpage></Postpage>
            </Route>
            <Route path="/">
              <Homepage></Homepage>
            </Route>
          </Switch>
        </Router>
      </SimpleBar>
    </main>
  );
};

export default Main;
