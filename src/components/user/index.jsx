import React from "react";
import styles from "./styles.module.css";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";

import { Avatar } from "../collections";
import { infoSelector } from "../../reducer/userSlice";

export const User = () => {
  const info = useSelector(infoSelector);

  return (

    <div>
      <div
        className={styles.user}
        data-tip
        data-for="user-details"
        data-event="click"
      >
        <Avatar url={info.avatar} size={32}></Avatar>
        <div style={{ paddingLeft: "5px", fontSize: "14px" }}>
          {info.username}
        </div>


      </div>

      <ReactTooltip
        id="user-details"
        place="bottom"
        type="dark"
        effect="solid"
        globalEventOff="click"
        eventOff="dbclick"
        clickable={true}
        className={styles.tooltips}
        offset={{ top: 5 }}
      >
        <div style={{ color: "#000", padding: "10px", cursor: "pointer" }}>
          设置
        </div>
        <div style={{ color: "#000", padding: "10px", cursor: "pointer" }}>
          登出
        </div>
      </ReactTooltip>
    </div>

  );
};
