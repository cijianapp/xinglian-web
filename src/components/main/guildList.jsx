import React from "react";
import styles from "./styles.module.css";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronDown } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { infoSelector } from "../../reducer/userSlice";
import { Avatar } from "../collections";
import { guildSelector, submitActions } from "../../reducer/submitSlice";

export const GuildList = () => {
  const info = useSelector(infoSelector);
  let guild = useSelector(guildSelector);

  const { guildID } = useParams();

  let guilds = [];
  let joined = false;

  if (Array.isArray(info.guild)) {
    info.guild.forEach(element => {
      guilds.push(<Guild key={element._id} guild={element}></Guild>);

      if (guildID === element._id) {
        guild = element;
        joined = true;
      }
    });
  }

  if (guildID !== undefined) {
    if (joined) {
      return (
        <div className={styles.guildList}>
          <GuildCurrent guild={guild}></GuildCurrent>
          <FiChevronDown></FiChevronDown>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div>
      <div
        className={styles.guildList}
        data-tip
        data-for="guild-submit"
        data-event="click"
      >
        <GuildCurrent guild={guild}></GuildCurrent>
        <FiChevronDown></FiChevronDown>
      </div>
      <ReactTooltip
        id="guild-submit"
        place="bottom"
        type="dark"
        effect="solid"
        globalEventOff="click"
        eventOff="dbclick"
        clickable={true}
        className={styles.tooltips}
        offset={{ top: 10 }}
      >
        {guilds}
      </ReactTooltip>
    </div>
  );
};

export const Guild = ({ guild }) => {
  const dispatch = useDispatch();

  return (
    <div
      to={guild._id}
      className={styles.guild}
      onClick={() => {
        dispatch(submitActions.toGuild(guild));
      }}
    >
      <Avatar size={24} url={guild.avatar}></Avatar>
      <div style={{ color: "#000", marginLeft: "5px", fontSize: "14px" }}>
        {guild.name}
      </div>
    </div>
  );
};

export const GuildCurrent = ({ guild }) => {
  if (guild.name === "none")
    return (
      <div className={styles.guildCurrent}>
        <div style={{ marginLeft: "5px", fontSize: "14px" }}>选择社区</div>
      </div>
    );

  return (
    <div className={styles.guildCurrent}>
      <Avatar size={22} url={guild.avatar}></Avatar>
      <div style={{ marginLeft: "5px", fontSize: "14px" }}>{guild.name}</div>
    </div>
  );
};
