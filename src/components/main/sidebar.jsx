import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import Axios from "axios";
import { useParams } from "react-router-dom";

import { baseURL } from "../../utils/http";
import { GuildCard } from "./guildCard";
import { loggedSelector } from "../../reducer/authSlice";
import { infoSelector } from "../../reducer/userSlice";
import { useSelector } from "react-redux";

export const Sidebar = ({ type }) => {
  const [guilds, setGuilds] = useState([]);
  const [guild, setGuild] = useState({});
  const { guildID } = useParams();

  useEffect(() => {
    const source = Axios.CancelToken.source();

    let guildCardList = [];

    if (type === "guild") {
      Axios.get(baseURL + "guest/guild", {
        params: { id: guildID },
        cancelToken: source.token
      })
        .then(response => {
          setGuild(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    Axios.get(baseURL + "guest/explore", {
      cancelToken: source.token
    })
      .then(response => {
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
  }, [type, guildID]);

  if (type === "guild") {
    return (
      <div className={styles.sidebar}>
        <GuildDetail guild={guild}></GuildDetail>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div style={{ margin: "5px ", fontSize: "24px", fontWeight: "bold" }}>
        此间热门社区
      </div>
      {guilds}
    </div>
  );
};

export const GuildDetail = ({ guild }) => {
  const logged = useSelector(loggedSelector);
  const info = useSelector(infoSelector);

  let joined = false;
  if (logged) {
    if (Array.isArray(info.guild)) {
      info.guild.forEach(element => {
        if (element._id === guild._id) joined = true;
      });
    }
  }
  return (
    <div className={styles.guildDetail}>
      <h4>社区详情</h4>

      <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>
        {guild.description}
      </div>

      <div style={{ padding: "10px 0px", fontSize: "14px" }}>
        {guild.membercount} 位成员
      </div>

      {joined ? (
        <button
          className={commonStyles.button_common}
          style={{
            height: "32px",
            fontSize: "14px",
            marginBottom: "5px"
          }}
        >
          发布新帖
        </button>
      ) : (
        <button
          className={commonStyles.button_green}
          style={{
            height: "32px",
            fontSize: "14px",
            marginBottom: "5px"
          }}
        >
          加入社区
        </button>
      )}
    </div>
  );
};
