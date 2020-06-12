import React from "react";
import styles from "./styles.module.css";
import { Switch, Route } from "react-router-dom";

import { Homepage } from "./homepage";
import { Postpage } from "../postpage";
import { Guildpage } from "./guildpage";

const Main = () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route exact path="/:guildID/:postID">
          <Postpage></Postpage>
        </Route>

        <Route exact path="/:guildID">
          <Guildpage></Guildpage>
        </Route>

        <Route path="/">
          <Homepage></Homepage>
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
