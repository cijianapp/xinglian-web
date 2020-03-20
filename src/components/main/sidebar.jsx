import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { baseURL } from "../../utils/http";
import { GuildCard } from "./guildCard";

export const Sidebar = () => {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(baseURL + "guest/explore", {
        cancelToken: source.token
      })
      .then(response => {
        let guildCardList = [];
        response.data.forEach(element => {
          guildCardList.push(
            <GuildCard guild={element} key={element._id}></GuildCard>
          );
        });

        guildCardList.push();

        setGuilds(guildCardList);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className={styles.sidebar}>
      <div style={{ margin: "5px ", fontSize: "24px", fontWeight: "bold" }}>
        此间热门社区
      </div>
      {guilds}
    </div>
  );
};
