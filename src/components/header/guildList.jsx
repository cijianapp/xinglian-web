import React from "react";
import styles from "./styles.module.css";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { FiHome, FiChevronDown } from "react-icons/fi";

import { infoSelector } from "../../reducer/userSlice";
import { Avatar } from "../collections";
import { useParams, Link } from "react-router-dom";

export const GuildList = () => {
  const info = useSelector(infoSelector);
  const { guildID } = useParams();

  let guilds = [];
  let guildcurrent = { name: "home" };

  guilds.push(<Guild key="home" guild={{ name: "home" }}></Guild>);

  if (Array.isArray(info.guild)) {
    info.guild.forEach(element => {
      guilds.push(<Guild key={element._id} guild={element}></Guild>);

      if (element._id === guildID) guildcurrent = element;
    });
  }

  return (
    <div>
      <div
        className={styles.guildList}
        data-tip
        data-for="guild-list"
        data-event="click"
      >
        <GuildCurrent guild={guildcurrent}></GuildCurrent>
        <FiChevronDown></FiChevronDown>
      </div>
      <ReactTooltip
        id="guild-list"
        place="bottom"
        type="dark"
        effect="solid"
        globalEventOff="click"
        eventOff="dbclick"
        clickable={true}
        className={styles.tooltips}
        offset={{ top: 5 }}
      >
        {guilds}
      </ReactTooltip>
    </div>
  );
};

export const Guild = ({ guild }) => {
  if (guild.name === "home")
    return (
      <Link to="/" className={styles.guild}>
        <FiHome size={20} style={{ padding: "2px" }} color="#000"></FiHome>
        <div style={{ color: "#000", marginLeft: "5px", fontSize: "14px" }}>
          主页
        </div>
      </Link>
    );

  return (
    <Link to={guild._id} className={styles.guild}>
      <Avatar size={24} url={guild.avatar}></Avatar>
      <div style={{ color: "#000", marginLeft: "5px", fontSize: "14px" }}>
        {guild.name}
      </div>
    </Link>
  );
};

export const GuildCurrent = ({ guild }) => {
  if (guild.name === "home")
    return (
      <div className={styles.guildCurrent}>
        <FiHome size={20} style={{ padding: "2px" }} color="#000"></FiHome>
        <div style={{ color: "#000", marginLeft: "5px", fontSize: "14px" }}>
          主页
        </div>
      </div>
    );

  return (
    <div className={styles.guildCurrent}>
      <Avatar size={22} url={guild.avatar}></Avatar>
      <div style={{ color: "#000", marginLeft: "5px", fontSize: "14px" }}>
        {guild.name}
      </div>
    </div>
  );
};
